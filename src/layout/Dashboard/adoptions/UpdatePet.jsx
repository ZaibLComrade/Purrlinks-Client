import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import Select from "react-select";
import category from "../../home/category/categoryData";
import axios from "axios";

export default function AddPet() {
	const CreateInputField = ({label, id, type}) => <div className="mb-4">
		<label 
			className="block mb-2 text-sm font-bold text-gray-700" 
			htmlFor={ id }
		>
			{ label }
		</label>
		<Field 
			className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
			id={ id } 
			name={ id }
			type={ type } 
			placeholder={ label }
		/>
		<p className="text-xs italic text-red-500">
			<ErrorMessage name={ id }/>
		</p>
	</div>
	
	const categoryOptions = [{ label: "None", icon: null }, ...category]
	
	const MyTextArea = ({label, ...props}) => {
		const [field, meta] = useField(props);
		return (
			<>
				<label 
					className="block mb-2 text-sm font-bold text-gray-700" 
					htmlFor={ props.id || props.name }
				>{ label }</label>
				<textarea className="text-area" {...field} {...props} />
				{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
				) : null}
			</>
		);
};
	
	return <div className="">
		<h2 className="text-2xl font-semibold font-nunito">Add a Pet</h2>
		<div>
			<Formik
				initialValues={{
					pet_name: "",
					pet_age: 0,
					pet_location: "",
					short_description: "",
					long_description: "",
					pet_category: "",
					imageFile: {},
				}}
				validate ={ values => {
					const errors = {};
					
					// Name validation
					const pet_name = values.pet_name;
					if(!pet_name) {
						errors.fullName = "Required";
					}
					
					// Age validation
					const pet_age = values.pet_age;
					if(!pet_age) {
						errors.pet_age = "Required";
					} else if(!/^\d+$/.test(pet_age) && parseInt(pet_age, 10) > 0) {
						errors.pet_age = "Invalid number";
					}
					
					// location validation
					const pet_location = values.pet_location;
					if(!pet_location) {
						errors.pet_location = "Required";
					}
					
					// short description validation
					const short_description = values.short_description;
					if(!short_description) {
						errors.short_description = "Required";
					}
					
					// Long description validation
					const long_description = values.long_description;
					if(!long_description) {
						errors.long_description = "Required";
					}
					
					// Category Validation
					const pet_category = values.pet_category;
					if(pet_category === "None") {
						errors.pet_category = "Required";
					}
					
					// Image file validation
					const imageFile = values.imageFile;
					if(!imageFile) {
						errors.imageFile = "Required";
					}
					
					return errors;
				}}
				onSubmit={ async (values) => {
					const { fullName, email, password, imageFile } = values;
					console.log(values);
					const formData = new FormData();
					formData.append("image", imageFile);
					const imgHostingApi = import.meta.env.VITE_IMG_HOSTING_API;
					const { data } = await axios.post(imgHostingApi, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						}
					})
					const imgUrl = data.data.display_url;
				}}
			>
				{ (formik) => {
					return <>
				<Form className="px-4 pt-6 pb-8 max-w-[500px]">
					{/* Pet Name */}
					<CreateInputField id="pet_name" label="Pet Name" type="text"/>
					
					{/* Age */}
					<CreateInputField id="pet_age" label="Age" type="number"/>
					
					{/* Pet Location */}
					<CreateInputField id="pet_location" label="Pet Location" type="text"/>
					
					{/* short_description */}
					<CreateInputField id="short_description" label="Short Description" type="text"/>
					
					{/* Long Description */}
					<MyTextArea
						className="w-full min-h-[100px] px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
						label="Long Description"
						name="long_description"
						rows="6"
						placeholder="Long Description"
					/>
					
					{/* Category options */}
					<div className="my-4">
						<label 
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="pet_category"
						>Category</label>
						<Select
          styles={{
            control: (base) => ({
              ...base,
              height: 40,
              minHeight: 40,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }),
          }}
          name="pet_category"
          options={categoryOptions}
          value={categoryOptions.find((option) => option.value === formik.values.pet_category)}
          onChange={(selectedOption) => formik.setFieldValue("pet_category", selectedOption?.value)}
        />
        <p className="text-xs italic text-red-500">
          <ErrorMessage name="pet_category" />
        </p>
					</div>
					
					{/* Image File */}
					<div className="mb-4">
						<label 
							className="block mb-2 text-sm font-bold text-gray-700" 
							htmlFor="imageFile"
						>
							Upload Image
						</label>
						<input 
							className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
							name="imageFile"
							id="imageFile" 
							type="file" 
							onChange={(event) => {
								formik.setFieldValue("imageFile", event.currentTarget.files[0]);
							}}
						/>
						
						
						<p className="text-xs italic text-red-500">
							<ErrorMessage name="imageFile"/>
						</p>
					</div>
					<div className="flex items-center justify-between font-opensans">
						<button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
							Register
						</button>
					</div>
				</Form>
				</>}}
			</Formik>
		</div>
	</div>
}
