import axios from "axios";
import {useEffect, useState} from "react";
import Table from "../shared/table/Table";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";

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
		accessorKey: "profile_picture",
		header: "Profile Picture",
		cell: row => {
			const imgRef = row.getValue();
			return <div className="mx-auto w-max">
				<img className="w-16 rounded-full" src={ imgRef }/>
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
	const [allPets, setAllPets] = useState([]);
	useEffect(() => {
		axios.get("/usersData.json")
			.then(({ data }) => setAllPets(data));
	}, [])
	
	return <Table columnDef={ allPetsColDef } data={ allPets }/>
}
