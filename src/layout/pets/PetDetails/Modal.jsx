import PropTypes from "prop-types";
import { Formik, Field, ErrorMessage, Form } from "formik";
import useAuth from "../../../hooks/useAuth";
import {useEffect, useState} from "react";

export default function Modal({ setToggleModal, toggleModal }) {
	const { user } = useAuth();
	console.log(user);
	
	const [ initVals, setInitVals ] = useState({
		full_name: user.displayName,
		email: user.email,
		user_location: "",
		phone: "",
	})
	console.log(initVals);
	useEffect(() => {
		setInitVals({
			full_name: user.displayName,
			email: user.email,
			user_location: "",
			phone: "",
		})
		console.log("rendered");
	}, [user?.displayName, user?.email, user])
	
	if(user)
	
	return (
		<>
			{/* <!-- Main modal --> */}
			<div
				tabIndex="-1"
				onClick={() => setToggleModal(false)}
				className={`overflow-y-auto ${
					toggleModal ? "block" : "hidden"
				} bg-black/50 overflow-x-hidden fixed z-50 justify-center flex items-center w-full inset-0 h-screen w-screen max-h-full`}
			>
				<div  className="relative w-full max-w-md max-h-full p-4">
					{/* <!-- Modal content --> */}
					<div onClick={ e => e.stopPropagation() } className="relative bg-white rounded-lg shadow">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-4 border-b rounded-t md:p-5">
							<h3 className="text-xl font-semibold text-gray-900">
								Adopt The Purr
							</h3>
							<button
								onClick={() => setToggleModal(false)}
								type="button"
								className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
								data-modal-hide="authentication-modal"
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-4 md:p-5">
							
							{/* Formik */}
							<Formik
								initialValues={ initVals }
								validate={ values => {
									const errors = {};
									console.log(values);
									
									if(!values.user_location) {
										errors.user_location = "Required";
									}
									
									if(!values.phone) {
										errors.phone = "Required";
									}
									
									return errors;
								}}
								onSubmut={ (values) => {
									console.log(values);
								}}
							>
								<Form className="space-y-4" action="#">
									<div>
										{/* Full Name */}
										<div className="mb-4">
											<label 
												className="block mb-2 text-sm font-medium text-gray-900" 
												htmlFor="full_name"
											>
												Full Name
											</label>
											<Field 
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
												id="full_name"
												name="full_name"
												type="text"
												defaultValue={ user.displayName }
												// Custom Style
												disabled={ true }
												placeholder="Full Name"
											/>
											<p className="mt-1 text-xs italic text-red-500">
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
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
												id="email"
												name="email"
												type="email"
												defaultValue={ user.email }
												// Custom Style
												disabled={ true }
												placeholder="Email"
											/>
											<p className="mt-1 text-xs italic text-red-500">
												<ErrorMessage name="email"/>
											</p>
										</div>
										
										{/* Phone */}
										<div className="mb-4">
											<label 
												className="block mb-2 text-sm font-medium text-gray-900" 
												htmlFor="phone"
											>
												Phone Number
											</label>
											<Field 
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
												id="phone"
												name="phone"
												type="text"
												placeholder="Phone Number"
											/>
											<p className="mt-1 text-xs italic text-red-500">
												<ErrorMessage name="phone"/>
											</p>
										</div>
										
										<div className="mb-4">
											<label 
												className="block mb-2 text-sm font-medium text-gray-900" 
												htmlFor="user_location"
											>
												Address
											</label>
											<Field 
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
												id="user_location"
												name="user_location"
												type="text"
												placeholder="Address"
											/>
											<p className="mt-1 text-xs italic text-red-500">
												<ErrorMessage name="user_location"/>
											</p>
										</div>
									</div>
									<button
										type="submit"
										className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
									>
										Send Adoption Request
									</button>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

Modal.propTypes = {
	setToggleModal: PropTypes.func,
	toggleModal: PropTypes.bool,
};
