import {Outlet} from "react-router-dom";
import Footer from "./layout/shared/Footer";
import Navbar from "./layout/shared/Navbar";
import useAuth from "./hooks/useAuth";

export default function App() {
	const { loading } = useAuth();
	if(loading) return <div>Loading...</div>;
	else {
	return <div className="bg-neutral">
		<Navbar/>
		<div className="min-h-[calc(100vh-96px)]">
			<Outlet/>
		</div>
		<Footer/>
	</div>
	}
}
