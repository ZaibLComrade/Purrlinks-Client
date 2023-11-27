import {useState} from "react";
import {Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
	const { user } = useAuth();
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const props = {
		toggleSidebar,
		setToggleSidebar,
		user,
	}
	return (
		<div className="overflow-hidden bg-neutral">
			<Navbar props={ props }/>
			<Sidebar props={ props }/>
			<div className="p-4 mt-[74px] min-h-[calc(100vh-90px)] lg:mt-[90px] sm:ml-72">
				<Outlet/>
			</div>
		</div>
	);
}
