import {Link, useLoaderData} from "react-router-dom";
import Table from "../shared/table/Table";
import addedPetsColDef from "../shared/table/addedPetsColDef";
import DashboardHeader from "../shared/header/DashboardHeader";

export default function MyPets() {
	const pets = useLoaderData([]);
	return <div>
		<DashboardHeader title="My Added Pets"/>
		<Table columnDef={ addedPetsColDef } data={ pets } />
	</div>
}
