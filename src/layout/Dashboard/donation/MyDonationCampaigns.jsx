import DashboardHeader from "../shared/header/DashboardHeader";
import Table from "../shared/table/Table";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ViewDonationModal from "./ViewDonatorsModal";
import {useState} from "react";

export default function MyDonationCampaigns() {
	const [ toggleModal, setToggleModal ] = useState(false);
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { data: campaigns = [] } = useQuery({
		queryKey: ["campaigns"],
		queryFn: async() => {
			const { data } = await axiosSecure(`/donation/user?email=${user.email}`);
			return(data)
		}
	})
	
	const campaignsColDef = [
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
			accessorKey: "progress",
			header: "Progress",
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
				},
				{ 
					accessorKey: "view_donations",
					header: "View Donations",
					cell: prop => {
						return <button onClick={() => setToggleModal(true)} className="text-base font-semibold rounded-lg hover:underline text-primary w-max font-montserrat transition delay-50 ease-in-out">
							View Donations
						</button>
					}
				},
			]
		}
	]
	
	return <div>
		<ViewDonationModal toggleModal={ toggleModal } setToggleModal={ setToggleModal }/>
		<DashboardHeader title="My Donation Campaigns"/>
		<Table columnDef={campaignsColDef} data={campaigns}/>
	</div>
}
