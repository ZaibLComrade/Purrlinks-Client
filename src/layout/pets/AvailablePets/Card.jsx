import PropTypes from "prop-types";
import { IoCalendarOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import {Link} from "react-router-dom";

export default function Card({ pet }) {
	const { _id, pet_name, pet_age, posted_date, pet_location, pet_image } = pet;
	const dateDiff = formatDistanceToNow(new Date(posted_date), { addSuffix: true });
	
	return <div className="relative min-h-[405px] mb-4 items-center text-center lg:text-left rounded-xl bg-neutral">
		<div className="w-full h-[300px] rounded-xl">
			<img src={ pet_image } className="object-cover w-full h-full rounded-xl"/>
		</div>
		<div className="absolute left-1/2 -translate-x-1/2 rounded-lg justify-between text-center bg-white w-[85%] bottom-0 text-title font-opensans gap-6">
				<div className="p-3 rounded-lg">
					<p className="mb-1 text-sm font-semibold text-right text-subtitle font-nunito">Posted {dateDiff}</p>
					<div className="space-y-2">
						<h3 className="text-2xl font-bold font-nunito"><span>{ pet_name }</span></h3>
						<div className="flex flex-col text-lg gap-[2px] flex-col-reverse items-center justify-between border-b-[1px] pb-2 mb-2">
							<p className="flex items-center gap-px">
								<IoLocationOutline className="mr-px"/>
								<span className="mr-px">Location:</span> 
								<span>{ pet_location }</span>
							</p>
							<p className="flex items-center gap-px">
								<IoCalendarOutline className="mr-px"/>
								<span className="mr-px">Age:</span> 
								<span>{`${ pet_age } ${ pet_age > 1 ? "years" : "year" }`}</span>
							</p>
						</div>
					</div>
					<div className="py-2 normal-case rounded-lg font-montserrat">
						<Link to={`/pets/details/${_id}`} className="font-bold hover:underline text-primary">
							Details
						</Link>
					</div>
				</div>
			</div>
	</div>
}

Card.propTypes = {
	pet: PropTypes.object,
}
