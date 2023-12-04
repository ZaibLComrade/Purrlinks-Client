import Skeleton from "./Skeleton";
import Card from "./Card";
import Header from "../../../components/headers/Header";
import Search from "./Search";
import Categories from "./Categories";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {useNavigate, useSearchParams} from "react-router-dom";
import qs from "query-string"
import {useEffect, useState} from "react";

export default function UnadoptedPets() {
	const axiosPublic = useAxiosPublic();
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const [pets, setPets] = useState([]);
	const [searchString, setSearchString] = useState("");
	
	const query = qs.parse(params.toString()).category || "";
	const [categoryQuery, setCategoryQuery] = useState(query);
	const [loading, setLoading] = useState(true);
	
	// const { data: pets = [], isPending: loading, refetch } = useQuery({
	// 	queryKey: ["pets"],
	// 	queryFn: async() => {
	// 		const { data } = await axiosPublic.get(`/adoption?category=${categoryQuery}&adopted=false`)
	// 		return data;
	// 	}
	// })
	useEffect(() => {
		setLoading(true);
		axiosPublic.get(`/adoption?category=${categoryQuery}&adopted=false&search=${searchString}`)
			.then(({ data }) => {
				setPets(data)
				setLoading(false);
			});
	}, [categoryQuery, axiosPublic, searchString])
	
	const handleCategoyItemClick = (category) => {
		let currentQueries = {};
		if(params) {
			currentQueries = qs.parse(params.toString())
			const updatedQuery = { ...currentQueries, category: category.value }
			const url = qs.stringifyUrl({
				url: "/pets",
				query: category.value ? updatedQuery : {},
			})
			setCategoryQuery(category.value);
			navigate(url);
		}
	}
	
	// Main component
	return <div className="space-y-8 py-[50px]">
		{/* Search */}
		<Header title="All pets" subtitle={"Browse your adoption"}/>
		<div className="container flex flex-col items-center justify-center mx-auto gap-4 md:flex-row">
				<Categories handleCategoyItemClick={ handleCategoyItemClick }/>
			<Search setSearchString={ setSearchString }/>
		</div>
		
		{/* Card Grids */}
		{ (loading) ?
		<div className="py-[50px] space-y-6">
			<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				{[...Array(4).keys()].map((n, i) =>  <Skeleton key={ i }/> )}
			</div>
		</div>
		:
		<div className="container mx-auto space-y-6">
			<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				{
					pets.length ? pets.map((pet) => <Card key={ pet._id } pet={ pet }/>) :
					<div className="mx-auto h-[50vh] relative col-span-2 w-max">
						<p className="text-base md:text-3xl">Data not available. Please try again later</p>
					</div>
				}
			</div>
		</div>
		}
	</div>
}
