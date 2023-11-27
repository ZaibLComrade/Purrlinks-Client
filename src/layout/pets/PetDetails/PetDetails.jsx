import { useLoaderData } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Modal from "./Modal";
import {useState} from "react";

export default function PetDetails() {
	const [toggleModal, setToggleModal] = useState(false);
	const {
		pet_category,
		pet_name,
		pet_age,
		pet_location,
		long_description,
		pet_image,
	} = useLoaderData();
	return <div className="container py-[50px] mx-auto">
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div className="p-4 h-[500px] w-full place-self-center">
				<img src={ pet_image } className="w-full h-full object cover rounded-xl"/>
			</div>
			<div className="relative p-4 text-subtitle space-y-4">
				<h5 className="font-medium">{ pet_category }</h5>
				<h2 className="text-5xl font-bold text-title md:text-6xl">{ pet_name }</h2>
				<div className="space-y-1">
					<div className="flex items-center gap-1">
						<IoCalendarOutline/>
						<p>Age: {pet_age}</p>
					</div>
					<div className="flex items-center gap-1">
						<IoLocationOutline/>
						<p>Location: { pet_location }</p>
					</div>
				</div>
				<p><span className="font-semibold text-title">Details: </span>{ long_description }</p>
				<div>
					<button 
						onClick={ () => setToggleModal(true) }
						className="px-5 py-3 text-sm font-semibold border-2 rounded-lg md:text-base bg-accent-2 border-accent-2 w-max text-title font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60"
					>Adopt Now</button>
				</div>
			</div>
		</div>
		
		<Modal setToggleModal={ setToggleModal } toggleModal={ toggleModal }/>
	</div>
}
