import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import axios from "axios";

export default function CreateCampaign() {
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
		<h2 className="pl-4 text-2xl font-semibold font-nunito">Create a Donation Campaign</h2>
		<div>
			<Formik
				initialValues={{
					pet_name: "",
					max_donation_amount: 0,
					last_date: "",
					short_description: "",
					long_description: "",
					imageFile: {},
				}}
				validate ={ values => {
					console.log(values);
					const errors = {};
					
					// Name validation
					const pet_name = values.pet_name;
					if(!pet_name) {
						errors.fullName = "Required";
					}
					
					// max donation amount validation
					const pet_age = values.pet_age;
					if(!pet_age) {
						errors.pet_age = "Required";
					} else if(!/^\d+$/.test(pet_age) && parseInt(pet_age, 10) > 0) {
						errors.pet_age = "Invalid number";
					}
					
					// date validation
					// const last_date = values.last_data;
					// if(new Date() < new Date(last_date)) {
					// 	console.log(new Date, new Date(last_date))
					// 	errors.last_date = "Invalid date format";
					// }
					
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
					// const { data } = await axios.post(imgHostingApi, formData, {
					// 	headers: {
					// 		"Content-Type": "multipart/form-data",
					// 	}
					// })
					// const imgUrl = data.data.display_url;
				}}
			>
				{ (formik) => {
					return <>
				<Form className="px-4 pt-6 pb-8 max-w-[500px]">
					{/* Pet Name */}
					<CreateInputField id="pet_name" label="Pet Name" type="text"/>
					
					{/* Maximum Donation Amount */}
					<CreateInputField id="max_donation_amount" label="Maximum Donation Amount" type="number"/>
					
					{/* Pet Location */}
					<CreateInputField id="last_date" label="Last Date" type="date"/>
					
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
					
					{/* Image File */}
					<div className="mb-4">
						<label 
							className="block mb-2 text-sm font-bold text-gray-700" 
							htmlFor="imageFile"
						>
							Upload Image
						</label>
						<input 
							className="w-full px-3 py-2 leading-tight text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
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
							Submit
						</button>
					</div>
				</Form>
				</>}}
			</Formik>
		</div>
	</div>
}
