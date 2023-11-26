import { Formik, Field, Form, ErrorMessage } from "formik";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterForm() {
	const {
		registerUser,
		updateUser,
		setLoading,
	} = useAuth();
	
	return <div className="flex w-full max-w-xs border-2 rounded-lg font-montserrat border-primary">
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
				registerUser(email, password)
					.then(() => {
						updateUser(fullName, imgUrl)
							.then(() => {
								Swal.fire({
									title: "Success",
									text: "User registered successfully",
									icon: "success",
									confirmButtonText: "Close",
								})
							})
					})
					.catch((err) => {
						if (err.code === "auth/email-already-in-use")
							Swal.fire({
								title: "Email is already in use",
								icon: "error",
								confirmButtonText: "Close",
							});
						setLoading(false);
					});
			}}
		>
			{ (formik) => {
				return <>
			<Form className="px-4 pt-6 pb-8 bg-white rounded-lg shadow-md">
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
				<div className="mx-auto my-6 text-sm text-center md:text-sm">
					<p>
						Already have an account?{" "}
						<Link
							className="text-blue-600 underline hover:text-blue-500"
							to="/login"
						>
							Login
						</Link>{" "}
						here
					</p>
				</div>
				
				<div className="flex items-center justify-between font-opensans">
					<button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
						Register
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
