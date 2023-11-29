import Table from "../shared/table/Table";
import DashboardHeader from "../shared/header/DashboardHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";

const allUsersColDef = [
	{ 
		accessorKey: "sl",
		header: "SL.",
		cell: prop => {
			const i  = prop.row.index;
			return i + 1;
		}
	},
	{ 
		accessorKey: "profile_picture",
		header: "Profile Picture",
		cell: row => {
			const imgRef = row.getValue();
			return <div className="mx-auto w-max">
				<img className="object-cover w-16 h-16 rounded-full" src={ imgRef }/>
			</div>
		},
	},
	{ accessorKey: "full_name", header: "Name" },
	{ accessorKey: "email", header: "Email" },
	{ 
		accessorKey: "role",
		header: "Role",
		cell: row => {
			const role = row.getValue();
			const isAdmin = role === "admin"
			return <span className="flex flex-col items-center justify-center gap-3">
				<span className={`${isAdmin && "text-secondary-1"}`}>{isAdmin ? "Admin" : "User"}</span>
				{!isAdmin && <button className="text-sm rounded-lg font-sekibold md:text-base w-max text-primary hover:underline font-montserrat transition delay-50 ease-in-out">Make Admin</button>}
			</span>
		}
	},
]

export default function AllUsers() {
	const axiosSecure = useAxiosSecure();
	const { data: allUsers = [], isPending } = useQuery({
		queryKey: ["allUsers"],
		queryFn: async() => {
			const { data } = await axiosSecure.get("/users")
			return data;
		}
	})
	
	return <div>
		<DashboardHeader title="All Users"/>
		{<Table columnDef={ allUsersColDef } data={ allUsers }/>}
	</div>
}
