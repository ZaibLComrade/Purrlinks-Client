import {useEffect, useState} from "react";
import Skeleton from "./Skeleton";
import Card from "./Card";
import Header from "../../../components/headers/Header";
import Search from "./Search";
import Categories from "./Categories";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

export default function UnadoptedPets() {
	const [pets, setPets] = useState([]);
	const [loading, setLoading] = useState(true);
	const axiosPublic = useAxiosPublic();
	
	useEffect(() => {
		axiosPublic.get(`/adoption`)
			.then(res => {
				setPets(res.data);
				setLoading(false);
			});
	}, [axiosPublic])
	
	
	// Main component
	return <div className="space-y-8 py-[50px]">
		{/* Search */}
		<Header title="All pets" subtitle={"Browse your adoption"}/>
		<div className="container flex flex-col items-center justify-center mx-auto gap-4 md:flex-row">
				<Categories/>
			<Search/>
		</div>
		
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
					pets.length ? pets.map((pet) => <Card key={ pet.id } pet={ pet }/>) :
					<div className="mx-auto h-[50vh] relative col-span-2 w-max">
						<p className="text-base md:text-3xl">Data not available. Please try again later</p>
					</div>
				}
			</div>
		</div>
		}
	</div>
}
