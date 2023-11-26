import { Formik, Field, Form, ErrorMessage } from "formik";
import Select from "react-select";

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
	
	return <div className="">
		<h2 className="text-2xl font-semibold font-nunito">Add a Pet</h2>
		<div>
			<Formik
				initialValues={{
					email: "",
					password: "",
					fullName: "",
					imageFile: {},
				}}
				validate ={ values => {
					const errors = {};
					
					const minLength = 6;
					const lengthExp = new RegExp(`^.{1,${minLength}}$`);
					const capitalExp = /[A-Z]/;
					const specialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
					
					// Name validation
					const fullName = values.fullName;
					if(!fullName) {
						errors.fullName = "Required";
					}
					
					// Email Validation
					const email = values.email;
					if(!email) {
						errors.email = 'Required';
					} else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
						errors.email = 'Invalid email address';
					} 
					
					// Password Validation
					const password = values.password;
					if(!password) {
						errors.password = 'Required';
					} else if(values.password.length > 15) {
						errors.password = 'Must be 15 characters or less';
					} else if(lengthExp.test(password)) {
						errors.password = "Password length must be more than 6 characters";
					} else if(!capitalExp.test(password)) {
						errors.password = "Password must contain at least 1 capital letter";
					} else if(!specialChar.test(password)) {
						errors.password = "Password must contain at least 1 special character";
					}
					
					return errors;
				}}
				onSubmit={ async (values) => {
					const { fullName, email, password, imageFile } = values;
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
				<Form className="px-4 pt-6 pb-8">
					{/* Pet Name */}
					<CreateInputField id="pet_name" label="Pet Name" type="text"/>
					
					{/* Email */}
					<CreateInputField id="email" label="Email" type="email"/>
					
					{/* Age */}
					<CreateInputField id="pet_age" label="Age" type="text"/>
					
					{/* Pet Location */}
					<CreateInputField id="pet_location" label="Pet Location" type="text"/>
					
					{/* short_description */}
					<CreateInputField id="short_description" label="Short Description" type="text"/>
					
					<div className="mb-4">
						<label 
							className="block mb-2 text-sm font-bold text-gray-700" 
							htmlFor="long_description"
						>
							Long Description
						</label>
						<Field 
							className="w-full min-h-[300px] px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
							id="long_description" 
							name="long_description"
							type="textarea"
							placeholder="Long Description"
						/>
						<p className="text-xs italic text-red-500">
							<ErrorMessage name="long_description"/>
						</p>
					</div>
					
					{/* Image File */}
					<div className="mb-4">
						<label 
							className="block mb-2 text-sm font-bold text-gray-700" 
							htmlFor="file"
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
