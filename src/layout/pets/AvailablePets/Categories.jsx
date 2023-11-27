import Select from "react-select";
import category from "../../home/category/categoryData";

export default function Categories() {
	const categoryOptions = [{ label: "All", icon: null }, ...category]
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
			defaultValue={ categoryOptions[0] }
			name="categories"
		/>
	</div>
}
