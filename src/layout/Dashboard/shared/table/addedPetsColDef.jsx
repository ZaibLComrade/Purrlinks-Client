import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const addedPetsColDef = [
	{ 
		accessorKey: "sl",
		header: "SL.",
		cell: prop => {
			const i  = prop.row.index;
			return i + 1;
		}
	},
	{ 
		accessorKey: "pet_image",
		header: "Image",
		cell: row => {
			const imgRef = row.getValue();
			return <div className="border rounded-lg h-[200px]">
				<img className="object-cover w-full h-full rounded-lg max-h-[200px]" src={ imgRef }/>
			</div>
		},
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
			}
		]
	}
]

export default addedPetsColDef;
