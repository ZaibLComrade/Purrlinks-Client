import { Formik, Field, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function LoginForm() {
	const { loginUser, setLoading, googleSignIn, facebookSignIn } = useAuth();
	const navigate = useNavigate();
	
	const handleGoogleSignIn = e => {
		e.preventDefault();
		googleSignIn()
			.then((result) => {
				// const user = result.user;
				// axiosSecure.put(`/users/${user.email}`, {
				// 	name: user.displayName,
				// 	image: user.photoURL,
				// 	email: user.email,
				// 	role: "user",
				// 	creationTime: user?.metadata?.creationTime,
				// 	lastSignInTime: user?.metadata?.lastSignInTime,
				// 	borrowed: [],
				// });
				
				Swal.fire({
					title: "Successfully logged in",
					icon: "success",
					confirmButtonText: "Continue",
				}).then(() => {
					navigate(location?.state || "/");
					setLoading(false);
				});
			})
			.catch(err => {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					confirmButtonText: "Ok",
				}).then(() => {
					setLoading(false);
				});
			});
	}
	
	const handleFacebookSignIn = e => {
		e.preventDefault();
		facebookSignIn()
			.then((result) => {
				// const user = result.user;
				// axiosSecure.put(`/users/${user.email}`, {
				// 	name: user.displayName,
				// 	image: user.photoURL,
				// 	email: user.email,
				// 	role: "user",
				// 	creationTime: user?.metadata?.creationTime,
				// 	lastSignInTime: user?.metadata?.lastSignInTime,
				// 	borrowed: [],
				// });
				
				Swal.fire({
					title: "Successfully logged in",
					icon: "success",
					confirmButtonText: "Continue",
				}).then(() => {
					navigate(location?.state || "/");
					setLoading(false);
				})
				.catch(err => {
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						confirmButtonText: "Ok",
					}).then(() => {
						setLoading(false);
					});
				});
			})
	}
	
	return <div className="flex w-full max-w-xs border-2 rounded-lg font-montserrat border-primary">
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			validate ={ values => {
				const errors = {};
				
				if (!values.email) {
					errors.email = 'Required';
				} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
					errors.email = 'Invalid email address';
				} 
				
				if (!values.password) {
					errors.password = 'Required';
				} else if (values.password.length > 15) {
					errors.password = 'Must be 15 characters or less';
				}
				
				return errors;
			}}
			onSubmit={ (values) => {
				const { email, password } = values;
				loginUser(email, password)
					.then(() => {
						Swal.fire({
							title: "User logged in successfully",
							icon: "success",
							confirmButtonText: "Ok",
						}).then(res => {
							if(res.isConfirmed) {
								navigate(location?.state || "/")
							}
						})
					})
					.catch((err) => {
							if(err.code === "auth/invalid-login-credentials") {
								Swal.fire({
									title: "Invalid Credentials",
									icon: "error",
									confirmButtonText: "Close",
								}).then(() => {
									setLoading(false);
								});
							} else if(err.code === "auth/too-many-requests") {
								Swal.fire({
									title: "Account has been temporarily disabled",
									text: "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
									icon: "error",
									confirmButtonText: "Close",
								}).then(() => {
									setLoading(false);
								});
							}
			});
			}}
		>
			<Form className="px-4 pt-6 pb-4 bg-white rounded-lg shadow-md">
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
				
				<div className="flex items-center justify-between font-opensans">
					<button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
						Sign In
					</button>
						<a className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800" href="#">
							Forgot Password?
						</a>
				</div>
				<div className="mx-auto mt-6 text-sm text-center md:text-sm">
					<p>
						Don&apos;t have an account?{" "}
						<Link
							className="text-blue-600 underline hover:text-blue-500"
							to="/register"
						>
							Register
						</Link>{" "}
						here
					</p>
				</div>
				<div className="w-full mx-auto mt-6 text-center">
					<hr className="w-full border"/>
					<p className="relative w-8 mx-auto font-bold bg-base-100 -top-3"> Or</p>
					<div className="space-y-3">
						<button onClick={ handleGoogleSignIn } type="button" className="flex items-center justify-center w-full py-2 mx-auto border-2 rounded-lg border-accent-2 bg-accent-2 gap-2"><FcGoogle className="text-2xl"/><span>Login with Google</span></button>
						<button onClick={ handleFacebookSignIn } type="button" className="flex items-center justify-center w-full py-2 mx-auto border-2 rounded-lg border-accent-1 bg-accent-1 gap-2"><FaFacebook className="text-2xl bg-white rounded-full text-[#4267B2]"/><span>Login with Facebook</span></button>
					</div>
				</div>
			</Form>

		</Formik>
	</div>
}
