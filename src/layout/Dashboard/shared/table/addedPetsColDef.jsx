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
]

export default addedPetsColDef;
