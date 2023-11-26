import PropTypes from "prop-types";
import dummyImage from "../../../assets/embrace-purr1.jpg";
import { IoCalendarOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import {Link} from "react-router-dom";

export default function Card({ pet }) {
	const { id, pet_name, pet_age, pet_location } = pet;
	return <div className="relative min-h-[405px] mb-4 items-center text-center lg:text-left rounded-xl bg-neutral">
		<div className="w-full h-[300px] rounded-xl">
			<img src={ dummyImage } className="object-cover w-full h-full rounded-xl"/>
		</div>
		<div className="absolute left-1/2 -translate-x-1/2 rounded-lg justify-between text-center bg-white w-[85%] bottom-0 text-title font-opensans gap-6">
				<div className="p-3 rounded-lg space-y-2">
					<h3 className="text-xl font-bold font-nunito"><span>Name:</span> <span>{ pet_name }</span></h3>
					<div className="flex flex-col flex-col-reverse md:flex-row items-center justify-between border-b-[1px] pb-2 mb-2">
						<p className="flex items-center gap-px">
							<IoLocationOutline className="mr-px"/>
							<span className="mr-px">Location:</span> 
							<span>{ pet_location }</span>
						</p>
						<p className="flex items-center gap-px">
							<IoCalendarOutline className="mr-px"/>
							<span className="mr-px">Age:</span> 
							<span>{ pet_age } years</span>
						</p>
					</div>
				</div>
				<div className="pb-3 normal-case rounded-lg font-montserrat">
					<Link to={`/books/details/${id}`} className="font-bold hover:underline text-primary">
						Details
					</Link>
				</div>
			</div>
	</div>
}

Card.propTypes = {
	pet: PropTypes.object,
}
