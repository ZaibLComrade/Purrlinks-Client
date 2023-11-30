import DashboardHeader from "../shared/header/DashboardHeader";
import { Link } from "react-router-dom";
import Table from "../shared/table/Table";
import { IoMdCreate } from "react-icons/io";
import {useQuery} from "@tanstack/react-query"; import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ViewDonationModal from "./ViewDonatorsModal";
import {useState} from "react";
import ProgressBar from "@ramonak/react-progress-bar";

export default function MyDonationCampaigns() {
	const [ toggleModal, setToggleModal ] = useState(false);
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { data: campaigns = [], refetch } = useQuery({
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
				size: 500,
			cell: ({ row }) => {
				const max = row.original.max_donation_amount;
				const prog = row.original.donated_amount;
				return <div className="min-w-[200px]"><ProgressBar 
					completed={ prog/max*100 }
					bgColor= {"#B683AB"}
					customLabel={`Needs 444$`}
					labelSize="12px"
				/></div>
			}
		},
		{ 
			accessorKey: "isPaused",
			header: "Status",
			cell: ({ row }) => {
				const _id = row.original._id;
				const isPaused = row.original.isPaused;
				const togglePause = () => {
					axiosSecure.patch(`/donation/${_id}?email=${user.email}`, { isPaused: !isPaused })
						.then(() => refetch())
				}
				
				return <span className="flex flex-col items-center justify-center gap-3">
					<span className={`${isPaused ? "text-paused-status" : "text-active-status"}`}>{isPaused ? "Paused" : "Active"}</span>
					{!isPaused 
						? <button onClick={ togglePause } className="text-sm font-semibold rounded-lg md:text-base w-max text-primary hover:underline font-montserrat transition delay-50 ease-in-out">Pause</button>
						: <button onClick={ togglePause } className="text-sm font-semibold rounded-lg md:text-base w-max text-primary hover:underline font-montserrat transition delay-50 ease-in-out">Resume</button>
					}
				</span>
			}
		},
		{ 
			accessorKey: "update",
			header: "Update",
			cell: ({ row }) => {
			const campaign_id = row.original._id
				return <Link to={ `/dashboard/donation/update/${ campaign_id }` }>
					<button className="p-4 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
						<IoMdCreate className="text-xl"/>
					</button>
				</Link>
			}
		},
		{ 
			accessorKey: "view_donations",
			header: "View Donations",
			cell: prop => {
				const campaign_id = prop.row.original._id
				return <>
					<button onClick={() => { setToggleModal(true); console.log(campaign_id)}} className="text-base font-semibold rounded-lg hover:underline text-primary w-max font-montserrat transition delay-50 ease-in-out">
						View Donations
					</button>
					<ViewDonationModal 
						toggleModal={ toggleModal } 
						setToggleModal={ setToggleModal } 
						campaign_id={ campaign_id }
					/>
				</>
			}
		}
	]
	
	return <div>
		<DashboardHeader title="My Donation Campaigns"/>
		<Table columnDef={campaignsColDef} data={campaigns}/>
	</div>
}
