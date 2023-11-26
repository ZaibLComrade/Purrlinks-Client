import {useState} from "react";
import AddPet from "./addpet/AddPet";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const props = {
		toggleSidebar,
		setToggleSidebar,
	}
	return (
		<div>
			<Navbar props={ props }/>
			<Sidebar props={ props }/>
			

			<div className="p-4 mt-[74px] lg:mt-[90px] sm:ml-72">
				<AddPet/>
			</div>
		</div>
	);
}
