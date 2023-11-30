import {useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardHeader from "../shared/header/DashboardHeader";
import Table from "../shared/table/Table";

export default function MyDonations() {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth()
	
	const { data: myDonations = [], refetch } = useQuery({
		queryKey: ["myDonations"],
		queryFn: async() => {
			const { data } = await axiosSecure.get(`/contribution?email=${user.email}`)
			return data;
		}
	})
	
	const myDonationsColDef = [
		{ 
			accessorKey: "pet_image",
			header: "Pet Image",
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
			cell: ({ row }) => {
				const id = row.original._id;
				console.log(id)
				const handleRefund = async() => {
					axiosSecure.delete(`/contribution/${id}`)
						.then(({data}) => {
							console.log(data);
							if(data.acknowledged) {
								Swal.fire({
									title: "Asked for refund",
									text: "Donation removed",
									icon: "success"
								})
							}
							refetch();
						})
				}
				return <button onClick={ handleRefund } className="px-4 py-2 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
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
