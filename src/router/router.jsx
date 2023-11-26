import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layout/home/Home";
import NotFound from "../layout/shared/NotFound";
import LoginPage from "../layout/login/LoginPage";
import RegisterPage from "../layout/register/RegisterPage";
import PetDetails from "../layout/pets/PetDetails/PetDetails";
import AvailablePets from "../layout/pets/AvailablePets/AvailablePets";
import axios from "axios";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		children: [
			{ path: "/*", element: <NotFound/> },
			{ path: "/", element: <Home/> },
			{ path: "/pets/available", element: <AvailablePets/> },
			{ 
				path: "/pets/details/:id",
				element: <PetDetails/>,
				loader : async ({ params }) => {
					const { data } = await axios.get("/petData.json");
					const petData = data.find(pet => params.id === pet.id)
					return petData || null;
				}
			},
			{ path: "/login", element: <LoginPage/> },
			{ path: "/register", element: <RegisterPage/> },
		],
	},
	{ path: "/dashboard", element: <div>This is dashboard</div> },
])

export default router;
