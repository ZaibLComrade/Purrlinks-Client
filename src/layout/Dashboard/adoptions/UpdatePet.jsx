import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import Select from "react-select";
import category from "../../home/category/categoryData";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {useLoaderData, useParams} from "react-router-dom";


export default function UpdatePet() {
	const _id = useParams().id;
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const data = useLoaderData();
	const petFormValues = {
		pet_name: data.pet_name,
		pet_age: data.pet_age,
		pet_location: data.pet_location,
		short_description: data.short_description,
		long_description: data.long_description,
		pet_category: data.pet_category,
		pet_image: data.pet_image,
	}
	
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
		<p className="mt-1 text-xs italic text-red-500">
			<ErrorMessage name={ id }/>
		</p>
	</div>
	
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
				<div className="mt-1 text-xs italic text-red-500">{meta.error}</div>
				) : null}
			</>
		);
};
		const defaultFormValue = {
		pet_name: "",
		pet_age: 0,
		pet_location: "",
		short_description: "",
		long_description: "",
		pet_category: "",
		pet_image: {},
	}
	return <div className="">
		<h2 className="text-2xl font-semibold font-nunito">Add a Pet</h2>
		<div>
			<Formik
				initialValues={ petFormValues || defaultFormValue }
				enableReinitialize
				validate ={ values => {
					const errors = {};
					
					// Name validation
					const pet_name = values.pet_name;
					if(!pet_name) {
						errors.pet_name = "Required";
					}
					
					// Category validation
					const pet_category = values.pet_category;
					if(!pet_category) {
						errors.pet_category = "Reqiured";
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
					
					return errors;
				}}
				onSubmit={ async (values) => {
					const { pet_image } = values;
					let imgUrl = "";
					
					const pfpObjLen = pet_image?.type;
					if(pfpObjLen) {
						const formData = new FormData();
						formData.append("image", pet_image);
						
						const imgHostingApi = import.meta.env.VITE_IMG_HOSTING_API;
						const { data } = await axios.post(imgHostingApi, formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							}
						})
						imgUrl = data.data.display_url;
					} 
					values.pet_image = imgUrl;
					
					const finalValues = {
						...values,
					}
					axiosSecure.patch(`/adoption/${ _id }?email=${user.email}`, finalValues)
						.then(({ data }) => {
							if(data.acknowledged) {
								Swal.fire({
									title: "Updated successfully",
									icon: "success",
									confirmButtonText: "Ok",
								})
							}
						})
				}}
			>
				{ (formik) => {
					return <>
				<Form className="px-4 pt-6 pb-8 max-w-[500px]">
					
					{/* Image File */}
					<div className="mb-4">
						<label 
							className="block mb-2 text-sm font-bold text-gray-700" 
							htmlFor="pet_image"
						>
							Upload Image
						</label>
						<input 
							className="w-full px-3 py-2 leading-tight text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
							name="pet_image"
							id="pet_image" 
							type="file" 
							onChange={(event) => {
								formik.setFieldValue("pet_image", event.currentTarget.files[0]);
							}}
						/>
						
						
						<p className="text-xs italic text-red-500">
							<ErrorMessage name="pet_image"/>
						</p>
					</div>
					
					{/* Pet Name */}
					<CreateInputField id="pet_name" label="Pet Name" type="text"/>
					
					{/* Age */}
					<CreateInputField id="pet_age" label="Age" type="number"/>
					
					{/* Pet Location */}
					<CreateInputField id="pet_location" label="Pet Location" type="text"/>
					
					{/* Category options */}
					<div className="my-4">
						<label 
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="pet_category"
						>Category</label>
						<Select
							options={ category }
							styles = {{
								control: base => ({
									...base,
									height: 40,
									minHeight: 40,
									boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
								})
							}}
							name="pet_category"
							onChange={ val => formik.setFieldValue("pet_category", val.value) }
						/>
						<p className="mt-1 text-xs italic text-red-500">
							<ErrorMessage name="pet_category" />
						</p>
					</div>
					
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
					
					<div className="flex items-center justify-between mt-4 font-opensans">
						<button className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-primary/80 focus:outline-none focus:shadow-outline" type="submit">
							Submit
						</button>
					</div>
				</Form>
				</>}}
			</Formik>
		</div>
	</div>
}
