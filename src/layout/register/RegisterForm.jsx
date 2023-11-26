import { Formik, Field, Form, ErrorMessage } from "formik";
import {useState} from "react";

export default function RegisterForm() {
	const [ profile, setProfile ] = useState({});
	return <div className="flex w-full max-w-xs border-2 rounded-lg font-montserrat border-primary">
		<Formik
			initialValues={{
				email: "",
				password: "",
				fullName: "",
				file: [],
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
				
				// Image file validation
				const file = values.file;
				if(!file) {
					errors.file = "Required";
				}
				
				return errors;
			}}
			onSubmit={ (values) => {
				setProfile(values);
			}}
		>
			{ (formik) => {
				return <>
			<Form className="px-8 pt-6 pb-8 bg-white rounded-lg shadow-md">
				{/* Name */}
				<div className="mb-4">
					<label 
						className="block mb-2 text-sm font-bold text-gray-700" 
						htmlFor="fullName"
					>
						Full Name
					</label>
					<Field 
						className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
						id="fullName" 
						name="fullName"
						type="text" 
						placeholder="Full Name"
					/>
					<p className="text-xs italic text-red-500">
						<ErrorMessage name="fullName"/>
					</p>
				</div>
				
				{/* Email */}
				<div className="mb-4">
					<label 
						className="block mb-2 text-sm font-bold text-gray-700" 
						htmlFor="email"
					>
						Email
					</label>
					<Field 
						className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
						id="email" 
						name="email"
						type="email" 
						placeholder="Email"
					/>
					<p className="text-xs italic text-red-500">
						<ErrorMessage name="email"/>
					</p>
				</div>
				
				{/* Password */}
				<div className="mb-4">
					<label 
						className="block mb-2 text-sm font-bold text-gray-700" 
						htmlFor="password"
					>
						Password
					</label>
					<Field 
						className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
						id="password" 
						name="password"
						type="password" 
						placeholder="Password"
					/>
					<p className="text-xs italic text-red-500">
						<ErrorMessage name="password"/>
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
						name="file"
						id="file" 
						type="file" 
						onChange={(event) => {
							formik.setFieldValue("file", event.currentTarget.files[0]);
						}}
					/>
					
					
					<p className="text-xs italic text-red-500">
						<ErrorMessage name="file"/>
					</p>
				</div>
				
				<div className="flex items-center justify-between font-opensans">
					<button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
						Sign In
					</button>
						<a className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800" href="#">
							Forgot Password?
						</a>
				</div>
			</Form>
			</>}}
		</Formik>
	</div>
}
