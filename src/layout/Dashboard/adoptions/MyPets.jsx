import {Link, useLoaderData} from "react-router-dom";
import Table from "../shared/table/Table";
import addedPetsColDef from "../shared/table/addedPetsColDef";

export default function MyPets() {
	const pets = useLoaderData([]);
	return <div className="overflow-x-auto rounded-lg">
		<Table columnDef={ addedPetsColDef } data={ pets } />
	</div>
}
