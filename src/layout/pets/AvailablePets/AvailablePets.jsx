import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Skeleton from "./Skeleton";
import Card from "./Card";
import Header from "../../../components/headers/Header";
import Search from "./Search";

export default function UnadoptedPets() {
	const [pets, setPets] = useState([]);
	const [toggleFilter, setToggleFilter] = useState(false);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	
	useEffect(() => {
	// 	axiosSecure.get(`/books?email=${user.email}&filter=${toggleFilter}`)
	// 		.then(res => {
	// 			setBooks(res.data);
	// 			setLoading(false);
	// 		});
	// }, [axiosSecure, user.email, toggleFilter])
		
		axios.get('/petData.json')
			.then(({ data }) => setPets(data));
			setLoading(false);
		
	}, [])
	
	// Loading Skeletons
	if(loading) return <div className="py-[50px] space-y-6">
		<h1 className="mx-auto text-5xl font-playfair w-max">All Pets</h1> 
		<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
			{[...Array(4).keys()].map((n, i) =>  <Skeleton key={ i }/> )}
		</div>
	</div>
	
	// Main component
	return <div className="space-y-8 py-[50px]">
		{/* Search */}
		<Header title="All pets" subtitle={"Browse your adoption"}/>
		<Search/>
		
		{/* Card Grids */}
		<div className="container mx-auto space-y-6">
			<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				{
					pets.length ? pets.map((pet) => <Card key={ pet.pet_name } pet={ pet }/>) :
					<div className="mx-auto h-[50vh] relative col-span-2 w-max">
						<p className="text-3xl">Books not available. Please try again later</p>
					</div>
				}
			</div>
		</div>
	</div>
}
