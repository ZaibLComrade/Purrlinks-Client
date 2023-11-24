import {Outlet} from "react-router-dom";
import Navbar from "./layout/shared/Navbar";

export default function App() {
	return <>
		<Navbar/>
		<Outlet/>
	</>
}
