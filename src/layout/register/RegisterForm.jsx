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
	
	return <div className="w-full border-2 rounded-lg font-montserrat">
		<Formik
			initialValues={{
				email: "",
				password: "",
				full_name: "",
				profile_picture: {},
			}}
			validate ={ values => {
				const errors = {};
				
				const minLength = 6;
				const lengthExp = new RegExp(`^.{1,${minLength}}$`);
				const capitalExp = /[A-Z]/;
				const specialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
				
				// Name validation
				const full_name = values.full_name;
				if(!full_name) {
					errors.full_name = "Required";
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
				const { full_name, email, password, profile_picture } = values;
				const formData = new FormData();
				formData.append("image", profile_picture);
				const imgHostingApi = import.meta.env.VITE_IMG_HOSTING_API;
				const { data } = await axios.post(imgHostingApi, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					}
				})
				const imgUrl = data.data.display_url;
				const finalValues = {
					...values,
					role: "user",
				}
				console.log(finalValues);
				
				registerUser(email, password)
					.then(() => {
						updateUser(full_name, imgUrl)
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
			<Form className="px-6 min-w-[350px] pt-6 pb-8 bg-white rounded-lg shadow-md">
				{/* Name */}
				<div className="mb-4">
					<label 
						className="block mb-2 text-sm font-medium text-gray-900" 
						htmlFor="full_name"
					>
						Full Name
					</label>
					<Field 
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
						id="full_name" 
						name="full_name"
						type="text" 
						placeholder="Full Name"
					/>
					<p className="text-xs italic text-red-500">
						<ErrorMessage name="full_name"/>
					</p>
				</div>
				
				{/* Email */}
				<div className="mb-4">
					<label 
						className="block mb-2 text-sm font-medium text-gray-900" 
						htmlFor="email"
					>
						Email
					</label>
					<Field 
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
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
						className="block mb-2 text-sm font-medium text-gray-900" 
						htmlFor="password"
					>
						Password
					</label>
					<Field 
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
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
						className="block mb-2 text-sm font-medium text-gray-900" 
						htmlFor="file"
					>
						Upload Image
					</label>
					<input 
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
						name="profile_picture"
						id="profile_picture" 
						type="file" 
						onChange={(event) => {
							formik.setFieldValue("profile_picture", event.currentTarget.files[0]);
						}}
					/>
					
					
					<p className="text-xs italic text-red-500">
						<ErrorMessage name="profile_picture"/>
					</p>
				</div>
				<div className="mx-auto my-6 text-sm text-center text-gray-500 md:text-sm">
					<p>
						Already have an account?{" "}
						<Link
							className="underline text-primary hover:text-blue-500"
							to="/login"
						>
							Login
						</Link>{" "}
						here
					</p>
				</div>
				
				<div className="flex items-center justify-between font-opensans">
					<button className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
						Register
					</button>
						<a className="inline-block text-sm font-bold align-baseline text-primary hover:text-blue-800" href="#">
							Forgot Password?
						</a>
				</div>
			</Form>
			</>}}
		</Formik>
	</div>
}
