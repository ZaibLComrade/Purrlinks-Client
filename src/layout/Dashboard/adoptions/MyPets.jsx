import Table from "../shared/table/Table";
import addedPetsColDef from "../shared/table/addedPetsColDef";
import DashboardHeader from "../shared/header/DashboardHeader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";

export default function MyPets() {
	const axiosSecure = useAxiosSecure()
	const { user } = useAuth();
	
	const { data: pets = [] } = useQuery({
		queryKey: ["pets"],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/adoption/user?email=${user?.email}`)
			return data;
		}
	})
	
	return <div>
		<DashboardHeader title="My Added Pets"/>
		<Table columnDef={ addedPetsColDef } data={ pets } />
	</div>
}
