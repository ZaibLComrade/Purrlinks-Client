import { useLoaderData } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";

export default function PetDetails() {
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
			<div className="p-4 place-self-center">
				<img src={ pet_iamge } className="w-full h-full object cover rounded-xl"/>
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
				<p className=""><span className="font-semibold text-title">Details: </span>{ long_description }</p>
				<div className="absolute bottom-5">
					<ButtonPrimary text="Adopt Now"/>
				</div>
			</div>
		</div>
	</div>
}
