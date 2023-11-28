import {useLoaderData} from "react-router-dom";
import DashboardHeader from "../shared/header/DashboardHeader";
import Table from "../shared/table/Table";

export default function MyDonations() {
	const myDonations = useLoaderData([]);
	
	// useEffect(() => {
	// }, [axiosSecure])
	
	const myDonationsColDef = [
		{ 
			accessorKey: "pet_image",
			header: "Pet Image",
			cell: row => {
				const imgRef = row.getValue();
				return <div className="rounded-lg max-h-[200px]">
				<img className="object-cover w-full h-full rounded-lg max-h-[200px]" src={ imgRef }/>
			</div>
			},
		},
		{ accessorKey: "pet_name", header: "Pet Name" },
		{ 
			accessorKey: "donated_amount",
			header: "Donated Amount",
			cell: prop => {
				const amount = prop.getValue();
				return <span>${amount}</span>
			}
		},
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
