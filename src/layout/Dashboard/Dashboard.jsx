import {useState} from "react";
import {Outlet} from "react-router-dom";
import LoadingScreen from "./shared/LoadingScreen";
import useAuth from "../../hooks/useAuth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
	const { user } = useAuth();
	const [ dashboardLoading, setDashboardLoading ] = useState(false);
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
			<div className={`${!dashboardLoading && "p-4"} mt-[74px] min-h-[calc(100vh-90px)] lg:mt-[90px] sm:ml-72`}>
				{
					dashboardLoading
						? <LoadingScreen/>
						: <Outlet/>
				}
			</div>
		</div>
	);
}
