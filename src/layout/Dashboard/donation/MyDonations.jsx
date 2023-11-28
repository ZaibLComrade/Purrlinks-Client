import axios from "axios";
import {useEffect, useState} from "react";
import DashboardHeader from "../shared/header/DashboardHeader";
import Table from "../shared/table/Table";

export default function MyDonations() {
	const [myDonations, setMyDonations] = useState([]);
	useEffect(() => {
		axios.get('/donationMade.json').then(({data}) => setMyDonations(data)); 
	}, [])
	
	const myDonationsColDef = [
		{ accessorKey: "pet_image", header: "Pet Image" },
		{ accessorKey: "pet_name", header: "Pet Name" },
		{ accessorKey: "donated_amount", header: "Donated Amount" },
		{ 
			accessorKey: "action",
			header: "Action",
			cell: prop => {
				return <button className="px-4 py-2 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
					Ask for refund
				</button>
			}
		},
	]
	
	return <div>
		<DashboardHeader title="My Donations"/>
		<Table columnDef={ myDonationsColDef } data={ myDonations }/>
	</div>
}
