import {useEffect, useState} from "react"
import axios from "axios";
import Skeleton from "./Skeleton";
import Card from "./Card";
import Header from "../../../../components/headers/Header";

export default function DonationCampaign() {
	const [campaigns, setCampaigns] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
	// 	axiosSecure.get(`/books?email=${user.email}&filter=${toggleFilter}`)
	// 		.then(res => {
	// 			setBooks(res.data);
	// 			setLoading(false);
	// 		});
	// }, [axiosSecure, user.email, toggleFilter])
		
		axios.get('/donationData.json')
			.then(({ data }) => {
				setCampaigns(data)
				setLoading(false);
			});
		
	}, [])
	
	return <div>
		<Header title="Donation Campaigns" subtitle="Give Hope, Give Love"/>
		{/* Card Grids */}
		{ (loading) ?
		<div className="py-[50px] space-y-6">
			<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
				{[...Array(4).keys()].map((n, i) =>  <Skeleton key={ i }/> )}
			</div>
		</div>
		:
		<div className="container mx-auto space-y-6">
			<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				{
					campaigns.length ? campaigns.map(campaign => <Card key={ campaign.id } campaign={ campaign }/>) :
					<div className="mx-auto h-[50vh] relative col-span-2 w-max">
						<p className="text-base md:text-3xl">Data not available. Please try again later</p>
					</div>
				}
			</div>
		</div>
		}
	</div>
}
