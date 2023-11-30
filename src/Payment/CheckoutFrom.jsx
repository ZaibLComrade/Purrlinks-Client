import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function CheckoutForm({ campaign_details }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [amountError, setAmountError] = useState(false);
	const [clientSecret, setClientSecret] = useState(null);
	const [error, setError] = useState("");
	const { user } = useAuth();
	const stripe = useStripe();
	const elements = useElements();
	const axiosSecure = useAxiosSecure();
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		if(!stripe || !elements) {
			return;
		}
		
		if(e.target.donation.value <= 0) {
			setAmountError("Invalid Amount");
			return;
		}
		setAmountError("");
		
		const card = elements.getElement(CardElement);
		if(!card) {
			return
		}
		
		const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card })
		if(error) {
			setError(error.message);
		}
		else {
			setError("");
		}
		
		const donation = e.target.donation.value;
		const { data } = await axiosSecure.post("/payment/create-intent", { donation })
		setClientSecret(data.clientSecret)
		
		if(clientSecret) {
			const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email || "anonymous",
						name: user?.displayName || "anonymous"
					}
				}
			})
			if(confirmError) {Swal.fire({
				title: "Error",
				text: confirmError,
				confirmButtonText: "Close",
				icon: "error",
			}).then((res) => {
				if(res.isConfirmed) setIsSubmitting(false)
			})} else {
				if(paymentIntent.status === "succeeded") {
					Swal.fire({
						title: "Donation Successfull",
						icon: "success",
						text: `Transanction Id ${paymentIntent.id}`
					}).then((res) => {
						if(res.isConfirmed) setIsSubmitting(false)
					})
					
					// Save info on database
					const donationInfo = {
						donated_to: campaign_details.campaign_id,
						pet_name: campaign_details.pet_name,
						pet_image: campaign_details.pet_image,
						contributer_name: user?.displayName || "anonymous",
						contributer_email: user?.email || "anonymous",
						donated_amount: parseInt(donation),
					}
					axiosSecure.post("/contribution", donationInfo);
				}
			}
		}
	}
	
	return <div>
		<form onSubmit={ handleSubmit }>
			<div>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>
				<p className="mt-1 text-xs italic text-red-500">{ error }</p>
			</div>
			<div className="mt-3 mb-4 grid gap-4 grid-cols-2">
				<div className="col-span-2 sm:col-span-1">
					<label
						htmlFor="price"
						className="block mb-2 text-sm font-medium text-gray-900"
					>
						Amount
					</label>
					<input
						type="number"
						name="donation"
						id="donation"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						placeholder="$"
						required=""
					/>
				<p className="mt-1 text-xs italic text-red-500">{ amountError }</p>
				</div>
				<button disabled={ isSubmitting || !stripe || !elements  } type="submit" className="w-full px-5 py-2 font-medium text-center text-white rounded-lg mt-7 md:h-[42px] bg-primary disabled:opacity-25 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary">
					Donate Now
				</button>
			</div>
		</form>
	</div>
}

CheckoutForm.propTypes = {
	campaign_details: PropTypes.object,
}
