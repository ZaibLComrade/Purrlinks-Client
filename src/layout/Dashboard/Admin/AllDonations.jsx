import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import DashboardHeader from "../shared/header/DashboardHeader";
import Table from "../shared/table/Table";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import {Link} from "react-router-dom";

export default function AllDonations() {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { data: allCampaigns = [], refetch } = useQuery({
		queryKey: ["allCampaigns"],
		queryFn: async() => {
			const { data } = await axiosSecure.get("/donation");
			return data;
		}
	})
	
	const allCampaignsColDef = [
		{ 
			accessorKey: "sl",
			header: "SL.",
			cell: prop => {
				const i  = prop.row.index;
				return i + 1;
			}
		},
		{ 
			accessorKey: "pet_image",
			header: "Image",
			cell: row => {
				const imgRef = row.getValue();
				if(!imgRef) return <p>Image Not Available</p>
				else return <p>{ imgRef }</p>
			},
		},
		{ accessorKey: "pet_name", header: "Name" },
		{ 
			accessorKey: "max_donation_amount", 
			header: "Max Donation Amount" ,
			cell: prop => {
				const amount = prop.getValue();
				return <span>${amount}</span>
			}
		},
		{ 
			accessorKey: "donated_amount", 
			header: "Donated Amount",
			cell: prop => {
				const amount = prop.getValue();
				return <span>${amount}</span>
			}
		},
		{ 
			accessorKey: "isPaused",
			header: "Status",
			cell: ({ row }) => {
				const isPaused = row.original.isPaused;
				const _id = row.original._id;
				const handlePaused = () => {
					axiosSecure.patch(`/pause-donation-campaign/${ _id }?email=${ user.email }`, { isPaused: !isPaused })
						.then(({ data }) => {
							if(data.acknowledged) {
								Swal.fire({
									title: "Operation Successfull",
									icon: "success",
									confirmButtonText: "ok",
								})
							}
							refetch();
						})
				}
				return <span className="flex flex-col items-center justify-center gap-3">
					<span className={`${isPaused ? "text-paused-status" : "text-active-status"}`}>{isPaused ? "Paused" : "Active"}</span>
					<button onClick={ handlePaused } className="text-sm font-semibold rounded-lg md:text-base w-max text-primary hover:underline font-montserrat transition delay-50 ease-in-out">{ isPaused ? "Resume" : "Pause" }</button>
				</span>
			}
		},
		{
			header: "actions",
			columns: [
				{ 
					accessorKey: "update",
					header: "Update",
					cell: ({ row }) => {
						const campaign_id = row.original._id;
						return <Link to={ `/dashboard/donation/update/${ campaign_id }` }><button className="p-4 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
							<IoMdCreate className="text-xl"/>
						</button></Link>
					}
				},
				{
					accessorKey: "delete",
					header: "Delete",
					cell: ({ row }) => {
						const _id = row.original._id;
						console.log(_id);
						const handleDelete = () => {
							Swal.fire({
								title: "Are you sure?",
								text: "Process can't be reverted",
								icon: "warning",
								showDenyButton: true,
								denyButtonText: "Cancel",
								confirmButtonText: "Proceed",
							}).then(res => {
								if(res.isConfirmed) {
									axiosSecure.delete(`/donation/${ _id }?email=${ user.email }`)
										.then(({ data }) => {
											if(data.deletedCount) {
												Swal.fire({
													title: "Operation Successfull",
													text: "Donation campaign deleted",
													icon: "success",
												})
											}else {
												Swal.fire({
													title: "Something went wrong",
													icon: "error",
												})
											}
											refetch();
										})
								}
							})
						}
						
						return <button onClick={ handleDelete } className="p-4 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
							<MdDelete className="text-xl"/>
						</button>
					}
				}
			]
		}
	]
	
	return <div>
		<DashboardHeader title="All Donations"/>
		<Table columnDef={ allCampaignsColDef } data={ allCampaigns }/>
	</div>
}
