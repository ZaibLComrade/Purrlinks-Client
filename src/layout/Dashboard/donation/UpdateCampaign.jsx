import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {useLoaderData, useParams} from "react-router-dom";

export default function UpdateCampaign() {
	const defaultCampaign = useLoaderData();
	const id = useParams().id;
	console.log(defaultCampaign);
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const formDefaults = {
		pet_name: defaultCampaign.pet_name,
		max_donation_amount: defaultCampaign.max_donation_amount,
		last_date: defaultCampaign.last_date,
		short_description: defaultCampaign.short_description,
		long_description: defaultCampaign.long_description,
		pet_image: defaultCampaign.pet_image,
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
	
	return <div className="">
		<h2 className="pl-4 text-2xl font-semibold font-nunito">Update Campaign</h2>
		<div>
			<Formik
				initialValues={ formDefaults || {
					pet_name: "",
					max_donation_amount: 0,
					last_date: "",
					short_description: "",
					long_description: "",
					pet_image: {},
				}}
				enableReinitialize
				validate ={ values => {
					const errors = {};
					
					// Name validation
					const pet_name = values.pet_name;
					if(!pet_name) {
						errors.pet_name = "Required";
					}
					
					// max donation amount validation
					const maxDonation = values.max_donation_amount;
					if(!maxDonation) {
						errors.max_donation_amount = "Required";
					} else if(!/^\d+$/.test(maxDonation) && parseInt(maxDonation, 10) < 0) {
						errors.max_donation_amount = "Invalid number";
					}
					
					const last_date = values.last_date;
					if(!last_date) {
						errors.last_date = "Required";
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
					const lastDateISO = new Date(values.last_date).toISOString();
					
					const finalValues = {
						...values,
						last_date: lastDateISO,
						creator: user.email,
						post_created: new Date().toISOString(),
						isPaused: false,
						donated_amount: 0,
					}
					
					console.log(id, finalValues);
					axiosSecure.patch(`/donation/${id}?email=${user.email}`, finalValues)
						.then(({ data }) => {
							if(data.acknowledged) {
								Swal.fire({
									title: "Campaign created successfully",
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
