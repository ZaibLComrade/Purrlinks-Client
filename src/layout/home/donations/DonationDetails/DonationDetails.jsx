import { useLoaderData } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import { BiSolidDonateHeart } from "react-icons/bi";
import ButtonPrimary from "../../../../components/buttons/ButtonPrimary";
import { FaDonate } from "react-icons/fa";
import {useEffect, useState} from "react";
import axios from "axios";
import Skeleton from "./Skeleton";
import Card from "./Card";

export default function DonationDetails() {
	const [recommended, setRecommended] = useState([])
	const [loading, setLoading] = useState(true);
	const {
		pet_name,
		max_donation_amount,
		donated_amount,
		long_description,
		short_description,
		post_created,
		last_donated,
		pet_image
	} = useLoaderData();
	
	useEffect(() => {
		axios.get("/donationData.json")
			.then(({ data }) => {
				setRecommended(data);
				setLoading(false);
			})
	}, [])
	
	return <div className="container py-[50px] mx-auto space-y-14">
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div className="p-4 place-self-center">
				<img src={ pet_image } className="w-full h-full object cover rounded-xl"/>
			</div>
			<div className="relative p-4 text-subtitle space-y-6">
				<div className="space-y-3">
					<h2 className="mx-auto text-5xl font-bold w-max text-title md:text-6xl">{ pet_name }</h2>
					<div className="text-center">{ short_description }</div>
				</div>
				
				<div className="flex items-center justify-around text-center lg:py-6">
					<div className="flex flex-col items-center gap-1">
						<FaDonate className="text-3xl text-primary"/>
						<p className="text-4xl text-title">${ max_donation_amount }</p>
						<p className="text-xl">Target</p>
					</div>
					<div className="flex flex-col items-center gap-1">
						<BiSolidDonateHeart className="text-3xl text-primary"/>
						<p className="text-4xl text-title">${ donated_amount }</p>
						<p className="text-xl">Donated</p>
					</div>
				</div>
				
				<div className="space-y-1 text-title">
					<div className="flex items-center gap-1">
						<IoCalendarOutline/>
						<p>Posted: <span className="text-subtitle">{post_created}</span></p>
					</div>
					<div className="flex items-center gap-1">
						<BiDonateHeart/>
						<p>Last donated: <span className="text-subtitle">{last_donated}</span></p>
					</div>
				</div>
				<p className="text-left">{ long_description }</p>
				<div>
					<ButtonPrimary text="Donate Now"/>
					{/* <ButtonPrimary text="See All Donations"/> */}
				</div>
			</div>
		</div>
		
		{/* Recommended Donations */}
		<div className>
			<h2 className="mx-auto mb-8 text-xl font-bold font-opensans md:text-4xl lg:text-5xl text-title w-max">Recommended Donations</h2>
			{ (loading) ?
				<div className="py-[50px] space-y-6">
					<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
						{[...Array(3).keys()].map((n, i) =>  <Skeleton key={ i }/> )}
					</div>
				</div>
				:
				<div className="container mx-auto space-y-6">
					<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{
						recommended.length ? recommended.map((recommendation, i) => {
							if(i < 3) return <Card key={ recommendation.id } recommendation={ recommendation } />
						})
						: <div>Something went wrong</div>
					}
					</div>
				</div>
			}
		</div>
	</div>
}
