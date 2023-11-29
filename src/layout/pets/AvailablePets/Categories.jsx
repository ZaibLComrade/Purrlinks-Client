import {useNavigate, useSearchParams} from "react-router-dom";
import Select from "react-select";
import category from "../../home/category/categoryData";
import qs from "query-string";
import PropTypes from "prop-types";

export default function Categories({ refetch }) {
	const categoryOptions = [{ label: "All", value:"", icon: null }, ...category]
	const [params] = useSearchParams();
	const navigate = useNavigate();
	
	const handleCategoyItemClick = (category) => {
		let currentQueries = {};
		console.log(category);
		if(params) {
			currentQueries = qs.parse(params.toString())
			const updatedQuery = { ...currentQueries, category: category.value }
			const url = qs.stringifyUrl({
				url: "/pets",
				query: category.value ? updatedQuery : {},
			})
			refetch()
			navigate(url);
		}
	}
	
	return <div className="w-[200px] flex items-center gap-2 justify-center">
		<h4>Category: </h4>
		<Select 
			styles={{ 
				control: base => ({
					...base,
					height: 50,
					width: 130,
				})
			}}
			options={ categoryOptions }
			value={ categoryOptions.find(opt => opt.value === qs.parse(params.toString()).category) }
			name="categories"
			onChange={ value => handleCategoyItemClick(value) }
		/>
	</div>
}

Categories.propTypes = {
	refetch: PropTypes.func
}
