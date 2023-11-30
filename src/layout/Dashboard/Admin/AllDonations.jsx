import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import DashboardHeader from "../shared/header/DashboardHeader";
import Table from "../shared/table/Table";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";

export default function AllDonations() {
	const axiosSecure = useAxiosSecure();
	const { data: allCampaigns = [] } = useQuery({
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
			cell: row => {
				
				const isPaused = row.getValue();
				return <span className="flex flex-col items-center justify-center gap-3">
					<span className={`${isPaused ? "text-paused-status" : "text-active-status"}`}>{isPaused ? "Paused" : "Active"}</span>
					{!isPaused 
						? <button className="text-sm font-semibold rounded-lg md:text-base w-max text-primary hover:underline font-montserrat transition delay-50 ease-in-out">Pause</button>
						: <button className="text-sm font-semibold rounded-lg md:text-base w-max text-primary hover:underline font-montserrat transition delay-50 ease-in-out">Resume</button>
					}
				</span>
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
					cell: prop => {
						return <button className="p-4 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
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
