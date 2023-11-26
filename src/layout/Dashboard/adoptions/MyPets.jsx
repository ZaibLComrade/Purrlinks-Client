import {Link, useLoaderData} from "react-router-dom";
import dummyImage from "../../../assets/embrace-purr1.jpg";

export default function MyPets() {
	const pets = useLoaderData([]);
	return <div>
		{ pets?.length && pets.map(({ 
			id,
			pet_image, 
			pet_name, 
			pet_age, 
			pet_category, 
			pet_location,
			short_description,
			long_description,
			posted_date,
			adopted,
		}) => <div key={ id } className="mb-4 h-[300px] md:flex rounded-xl bg-neutral">
			<div className="w-[500px] rounded-xl rounded-r-none">
				<img src={ dummyImage } className="object-cover w-full h-full rounded-r-none rounded-xl"/>
			</div>
			<div className="h-full rounded-lg grow">
				<div className="h-full p-3 bg-white rounded-lg rounded-l-none space-y-4 divide-y text-title font-opensans">
					<div className="rounded-lg space-y-2">
						<h3 className="text-3xl font-bold font-nunito"><span>{ pet_name }</span></h3>
					</div>
					<div className="pt-6 text-center divide-x p2-4 font-montserrat grid grid-cols-2 gap-1">
						<div className="">
							<span>Posted Date</span>
							<span></span>
						</div>
						<div className="">
						</div>
					</div>
					<div className="pt-3 normal-case rounded-lg font-montserrat">
						<Link to={`/pet/details/${id}`} className="font-bold hover:underline text-primary">
							View Details
						</Link>
					</div>
				</div>
				<div className=""></div>
			</div>
		</div>
		)}
	</div>
}
