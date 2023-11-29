import Table from "../shared/table/Table";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import DashboardHeader from "../shared/header/DashboardHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {useQuery} from "@tanstack/react-query";

export default function AllPets() {
	const axiosSecure = useAxiosSecure();
	const { data: allPets = [], refetch } = useQuery({
		queryKey: ["allPets"],
		queryFn: async() => {
			const { data } = axiosSecure.get("/adoption")
			return data;
		}
	})
	
	const allPetsColDef = [
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
				return <div className="rounded-lg max-h-[200px]">
					<img className="object-cover w-full h-full rounded-lg max-h-[200px]" src={ imgRef }/>
				</div>
			},
		},
		{ accessorKey: "pet_name", header: "Name" },
		{ accessorKey: "pet_category", header: "Category" },
		{ 
			accessorKey: "adopted",
			header: "Adoption Status",
			cell: row => {
				
				const isAdopted = row.getValue();
				return <span className="flex flex-col items-center justify-center gap-3">
					<span className={`${isAdopted ? "text-accept" : "text-paused-status"}`}>{isAdopted ? "Adopted" : "Not Adopted"}</span>
					<button className="text-sm rounded-lg font-sekibold md:text-base w-max text-primary hover:underline font-montserrat transition delay-50 ease-in-out">Toggle Status</button>
				</span>;
			}
		},
		{
			header: "actions",
			columns: [
				{ 
					accessorKey: "update",
					header: "Update",
					cell: prop => {
						return <button className="p-4 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
							<IoMdCreate className="text-xl"/>
						</button>
					}
				},
				{
					accessorKey: "delete",
					header: "Delete",
					cell: ({ row }) => {
						const _id = row.original._id
						const handleDeletePet = () => {
							Swal.fire({
								title: "Are you sure?",
								text: "Action can't be reverted",
								icon: "warning",
								confirmButtonText: "Proceed",
								showDenyButton: true,
								denyButtonText: "Cancel",
							}).then(async (res) => {
								if(res.isConfirmed) {
									const { data } = await axiosSecure.delete(`/adoption/${_id}?email=${user.email}`)
									if(data.acknowledged) {
										Swal.fire({
											title: "Deleted Successfully",
											icon: "success",
											confirmButtonText: "Ok",
										})
									}
									refetch();
								}
							})
						}
						
						return <button onClick={ handleDeletePet } className="p-4 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
							<MdDelete className="text-xl"/>
						</button>
					}
				}
			]
		}
	]
	
	return <div>
		<DashboardHeader title="All Pets"/>
		<Table columnDef={ allPetsColDef } data={ allPets }/>
	</div>
}
