import { useLoaderData } from "react-router-dom";
import exampleImage from "../../../../assets/embrace-purr1.jpg";
import { IoCalendarOutline } from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import ButtonPrimary from "../../../../components/buttons/ButtonPrimary";
import { FaDonate } from "react-icons/fa";
import {useEffect, useState} from "react";
import axios from "axios";
import Skeleton from "./Skeleton";

export default function DonationDetails() {
	const [recommended, setRecommended] = useState([])
	const [loading, setLoading] = useState(false);
	const {
		pet_name,
		max_donation_amount,
		donated_amount,
		long_description,
		short_description,
		post_created,
		last_donated,
	} = useLoaderData();
	
	useEffect(() => {
		axios.get("/donationData.json")
			.then(({ data }) => {
				console.log(data);
				setRecommended(data);
				setLoading(false);
			})
	}, [])
	
	return <div className="container py-[50px] mx-auto">
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div className="p-4 place-self-center">
				<img src={ exampleImage } className="w-full h-full object cover rounded-xl"/>
			</div>
			<div className="relative p-4 text-subtitle space-y-6">
				<h5 className="font-medium">Posted: { post_created }</h5>
				
				<div className="space-y-3">
					<h2 className="mx-auto text-5xl font-bold w-max text-title md:text-6xl">{ pet_name }</h2>
					<div className="text-center">{ short_description }</div>
				</div>
				
				<div className="flex items-center justify-around text-center lg:py-6">
					<div className="flex flex-col items-center gap-1">
						<FaDonate className="text-3xl"/>
						<p className="text-4xl text-title">${ max_donation_amount }</p>
						<p className="text-xl">Target</p>
					</div>
					<div className="flex flex-col items-center gap-1">
						<BiDonateHeart className="text-3xl"/>
						<p className="text-4xl text-title">${ donated_amount }</p>
						<p className="text-xl">Donated</p>
					</div>
				</div>
				
				<div className="space-y-1">
					<div className="flex items-center gap-1">
						<IoCalendarOutline/>
						<p>Last donated: {last_donated}</p>
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
			<h2 className="mx-auto text-lg font-opensans md:text-2xl text-title w-max">Recommended Donations</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{
					loading ? <Skeleton/>
						:
						recommended.length ? recommended.map((dat, i) => {
							return <div key={ dat.id }></div>
						})
						: <div>Something went wrong</div>
				}
			</div>
		</div>
	</div>
}
