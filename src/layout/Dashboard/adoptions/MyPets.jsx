import Table from "../shared/table/Table";
import DashboardHeader from "../shared/header/DashboardHeader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import UpdatePet from "./UpdatePet";
import {useState} from "react";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

export default function MyPets() {
	const axiosSecure = useAxiosSecure()
	const { user } = useAuth();
	const [toggleEditModal, setToggleEditModal] = useState(false);
	
	const { data: pets = [], refetch } = useQuery({
		queryKey: ["pets"],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/adoption/user?email=${user?.email}`)
			return data;
		}
	})
	
	// const handleDeletePet = () => {
	// 	const { data: deletedStatus = {} } = useQuery({
	// 		queryKey: ["delete_pet"],
	// 		queryFn: async() => {
	// 			const { data } = useAxiosSecure.delete(`/adoption/${_id}?email=${user?.email}`)
	// 		}
	// 	})
	// }
	
	const addedPetsColDef = [
		{ 
			accessorKey: "sl",
			header: "SL.",
			cell: prop => {
				const i  = prop.row.index;
				return `${i + 1}`;
			},
		},
		// { 
		// 	accessorKey: "_id",
		// 	state: () => {
		// 		console.log("hello");
		// 	}
		// },
		{ 
			accessorKey: "pet_image",
			header: "Image",
		},
		{ accessorKey: "pet_name", header: "Name" },
		{ accessorKey: "pet_category", header: "Category" },
		{ 
			accessorKey: "adopted",
			header: "Adoption Status",
			cell: row => {
				const isAdopted = row.getValue();
				return isAdopted ? "Adopted" : "Not Adopted";
			}
		},
		{
			header: "actions",
			columns: [
				{ 
					accessorKey: "update",
					header: "Update",
					cell: ({ row }) => {
						const adoption_id = row.original._id
						return <Link to={ `/dashboard/adoption/update/${ adoption_id }` }>
					<button className="p-2 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
						<IoMdCreate className="text-xl"/>
					</button>
				</Link>
					}
				},
				{
					accessorKey: "delete",
					header: "Delete",
					cell: ({ row }) => {
						const _id = row.original._id
						const handleDeletePet = () => {
							Swal.fire({
								title: "Are you sure?",
								text: "Action can't be reverted",
								icon: "warning",
								confirmButtonText: "Proceed",
								showDenyButton: true,
								denyButtonText: "Cancel",
							}).then(async (res) => {
								if(res.isConfirmed) {
									const { data } = await axiosSecure.delete(`/adoption/${_id}?email=${user.email}`)
									if(data.acknowledged) {
										Swal.fire({
											title: "Deleted Successfully",
											icon: "success",
											confirmButtonText: "Ok",
										})
									}
									refetch();
								}
							})
						}
						
						return <button onClick={ handleDeletePet } className="p-2 font-semibold border-2 rounded-lg bg-accent-2 border-accent-2 w-max font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">
							<MdDelete className="text-xl"/>
						</button>
					}
				}
			]
		}
	]
	
	
	return <div>
		<DashboardHeader title="My Added Pets"/>
		<Table columnDef={ addedPetsColDef } data={ pets } />
	</div>
}
