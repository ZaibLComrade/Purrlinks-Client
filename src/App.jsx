import {Outlet} from "react-router-dom";
import Footer from "./layout/shared/Footer";
import Navbar from "./layout/shared/Navbar";

export default function App() {
	return <div className="bg-neutral">
		<Navbar/>
		<div className="min-h-[calc(100vh-96px)]">
			<Outlet/>
		</div>
		<Footer/>
	</div>
}
