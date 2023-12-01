import {useNavigate, useSearchParams} from "react-router-dom";
import Select from "react-select";
import category from "../../home/category/categoryData";
import qs from "query-string";
import PropTypes from "prop-types";

export default function Categories({ handleCategoyItemClick }) {
	const categoryOptions = [{ label: "All", value:"", icon: null }, ...category]
	
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
			name="categories"
			onChange={ value => handleCategoyItemClick(value) }
		/>
	</div>
}

Categories.propTypes = {
	refetch: PropTypes.func
}
