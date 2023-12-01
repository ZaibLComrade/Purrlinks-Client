import Select from "react-select";
import category from "../../home/category/categoryData";
import PropTypes from "prop-types";
import {useSearchParams} from "react-router-dom";
import qs from "query-string";

export default function Categories({ handleCategoyItemClick }) {
	const categoryOptions = [{ label: "All", value:"", icon: null }, ...category]
	const [params] = useSearchParams();
	
	const categoryParams = qs.parse(params.toString())
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
			value={ categoryOptions.find(categ => categ.value === (categoryParams?.category || "")) }
			options={ categoryOptions }
			name="categories"
			onChange={ value => handleCategoyItemClick(value) }
		/>
	</div>
}

Categories.propTypes = {
	handleCategoyItemClick: PropTypes.func,
}
