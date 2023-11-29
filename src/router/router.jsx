import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layout/home/Home";
import NotFound from "../layout/shared/NotFound";
import LoginPage from "../layout/login/LoginPage";
import RegisterPage from "../layout/register/RegisterPage";
import PetDetails from "../layout/pets/PetDetails/PetDetails";
import AvailablePets from "../layout/pets/AvailablePets/AvailablePets";
import PrivateRoute from "../components/PrivateRoutes/PrivateRoute";
import DonationCampaign from "../layout/home/donations/DonationCampaign/DonationCampaign";
import DonationDetails from "../layout/home/donations/DonationDetails/DonationDetails";
import Dashboard from "../layout/Dashboard/Dashboard";
import AddPet from "../layout/Dashboard/adoptions/AddPet";
import MyPets from "../layout/Dashboard/adoptions/MyPets";
import CreateCampaign from "../layout/Dashboard/donation/CreateCampaign";
import AllPets from "../layout/Dashboard/Admin/AllPets";
import AllUsers from "../layout/Dashboard/Admin/AllUsers";
import AllDonations from "../layout/Dashboard/Admin/AllDonations";
import MyAdoptionRequests from "../layout/Dashboard/adoptions/MyAdoptionRequests";
import MyDonationCampaigns from "../layout/Dashboard/donation/MyDonationCampaigns";
import MyDonations from "../layout/Dashboard/donation/MyDonations";
import url from "./url";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		children: [
			{ path: "/*", element: <NotFound/> },
			{ path: "/", element: <Home/> },
			{ path: "/pets", element: <AvailablePets/> },
			{ 
				path: "/pets/details/:id",
				element: <PetDetails/>,
				loader: ({ params }) => fetch(`${url}/adoption/details/${params.id}`)
			},
			{ path: "/donation/campaigns", element: <DonationCampaign/> },
			{ 
				path: "/donation/details/:id",
				element: <DonationDetails/>,
				loader: ({ params }) => fetch(`${url}/donation/details/${params.id}`)
			},
			{ path: "/login", element: <LoginPage/> },
			{ path: "/register", element: <RegisterPage/> },
		],
	},
	{ 
		path: "/dashboard", 
		element: <PrivateRoute><Dashboard/></PrivateRoute>,
		children: [
			// User routes
			{ path: "/dashboard/*", element: <NotFound/>},
			{ path: "/dashboard/adoption/add", element: <AddPet/> },
			{ path: "/dashboard/adoption/my", element: <MyPets/> },
			{ path: "/dashboard/adoption/requests", element: <MyAdoptionRequests/> },
			{ path: "/dashboard/donation/add", element: <CreateCampaign/> },
			{ path: "/dashboard/donation/my", element: <MyDonationCampaigns/> },
			{ 
				path: "/dashboard/donation/contributed/:email",
				element: <MyDonations/>,
				loader: ({ params }) => fetch(`/contributions.json`)
			},
			
			// Admin routes
			{ path: "/dashboard/adoption/all", element: <AllPets/>},
			{ path: "/dashboard/user/all", element: <AllUsers/>},
			{ path: "/dashboard/donation/all", element: <AllDonations/>},
		]
	},
])

export default router;
