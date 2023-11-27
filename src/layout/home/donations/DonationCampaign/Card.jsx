import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function Card({ campaign }) {
	const { 
		id,
		pet_name,
		max_donation_amount,
		donated_amount,
		pet_image,
	} = campaign;
	return <div className="items-center mb-4 text-center lg:text-left rounded-xl bg-neutral">
		<div className="w-full h-[300px] rounded-xl rounded-b-none">
			<img src={ pet_image } className="object-cover w-full h-full rounded-b-none rounded-xl"/>
		</div>
		<div>
			<div className="bottom-0 justify-between p-3 text-center bg-white rounded-lg rounded-t-none space-y-4 divide-y full text-title font-opensans gap-6">
				<div className="rounded-lg space-y-2">
					<h3 className="text-3xl font-bold font-nunito"><span>{ pet_name }</span></h3>
				</div>
				<div className="pt-6 text-center divide-x p2-4 font-montserrat grid grid-cols-2 gap-1">
					<div className="">
						<div className="text-3xl font-medium">{ max_donation_amount }$</div>
						<div className="text-subtitle">Maximum Amount</div>
					</div>
					<div className="">
						<div className="text-3xl font-medium">{ donated_amount }$</div>
						<div className="text-subtitle">Donated</div>
					</div>
				</div>
				<div className="pt-3 normal-case rounded-lg font-montserrat">
					<Link to={`/donation/details/${id}`} className="font-bold hover:underline text-primary">
						View Details
					</Link>
				</div>
			</div>
			<div className=""></div>
		</div>
	</div>
}

Card.propTypes = {
	campaign: PropTypes.object,
}
