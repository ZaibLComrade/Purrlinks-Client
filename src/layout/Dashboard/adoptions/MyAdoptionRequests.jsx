import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardHeader from "../shared/header/DashboardHeader";
import Table from "../shared/table/Table";

export default function MyAdoptionRequests() {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { data: requestsData = [] } = useQuery({
		queryKey: ['requests'],
		queryFn: async() => {
			const { data } = await axiosSecure(`/adoption/requests?email=${user.email}`)
			return data;
		}
	})
	
	const requestsColDef = [
		{
			accessorKey: "sl",
			header: "SL.",
			cell: prop => {
				const i  = prop.row.index;
				return i + 1;
			},
		},
		{ accessorKey: "pet_name", header: "Pet" },
		{ accessorKey: "full_name", header: "Name" },
		{ accessorKey: "email", header: "Email" },
		{ accessorKey: "phone", header: "Ph. Number" },
		{
			header: "actions",
			columns: [
				{ 
					accessorKey: "accept",
					header: "Accept",
					cell: prop => {
						return <button className="text-sm font-semibold rounded-lg md:text-base w-max text-accept hover:underline font-montserrat transition delay-50 ease-in-out">
							Accept
						</button>
					}
				},
				{
					accessorKey: "reject",
					header: "Reject",
					cell: prop => {
						return <button className="text-sm font-semibold rounded-lg md:text-base w-max text-reject hover:underline font-montserrat transition delay-50 ease-in-out">
							Reject
						</button>
					}
				}
			]
		}
	]
	
	return <div>
		<DashboardHeader title="Adoption Requests"/>
		<Table columnDef={requestsColDef} data={requestsData}/>
	</div>
}
