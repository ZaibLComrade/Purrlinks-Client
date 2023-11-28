import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import {useState} from "react";

export default function CheckoutForm({ campaign_details }) {
	const [error, setError] = useState("");
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(!stripe || !elements) return;
		
		const card = elements.getElement(CardElement);
		if(!card) return;
		
		const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card })
		if(error) {
			console.log("Payment error", error)
			setError(error.message);
		}
		else {
			console.log("paymentMethod", paymentMethod);
			setError("");
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
						Price
					</label>
					<input
						type="number"
						name="price"
						id="price"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						placeholder="$"
						required=""
					/>
				</div>
				<button type="submit" className="w-full px-5 py-2 font-medium text-center text-white rounded-lg mt-7 bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary">
					Donate Now
				</button>
			</div>
		</form>
	</div>
}

CheckoutForm.propTypes = {
	campaign_details: PropTypes.object,
}
