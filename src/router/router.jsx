import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layout/home/Home";
import NotFound from "../layout/shared/NotFound";
import LoginPage from "../layout/login/LoginPage";
import RegisterPage from "../layout/register/RegisterPage";
import PetDetails from "../layout/pets/PetDetails/PetDetails";
import AvailablePets from "../layout/pets/AvailablePets/AvailablePets";
import axios from "axios";
import DonationCampaign from "../layout/home/donations/DonationCampaign/DonationCampaign";
import DonationDetails from "../layout/home/donations/DonationDetails/DonationDetails";

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
				loader: async ({ params }) => {
					const { data } = await axios.get("/petData.json");
					const petData = data.find(pet => params.id === pet.id);
					return petData || null;
				}
			},
			{ path: "/donation/campaigns", element: <DonationCampaign/> },
			{ 
				path: "/donation/details/:id",
				element: <DonationDetails/>,
				loader: async ({ params }) => {
					const { data } = await axios.get("/donationData.json");
					const campaignDetails = data.find(campaign => params.id === campaign.id);
					return campaignDetails || null;
				}
			},
			{ path: "/login", element: <LoginPage/> },
			{ path: "/register", element: <RegisterPage/> },
		],
	},
	{ path: "/dashboard", element: <div>This is dashboard</div> },
])

export default router;
