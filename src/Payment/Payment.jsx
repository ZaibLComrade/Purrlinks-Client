import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutFrom";
import PropTypes from "prop-types";
import "./stripe.css";

export default function Payment({ campaign_details }) {
	const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
	return <div>
		<h1 className="block mb-2 text-sm font-medium text-gray-900">Payment</h1>
		<div>
			<Elements stripe={stripePromise}>
				<CheckoutForm campaign_details={ campaign_details }/>
			</Elements>
		</div>
	</div>
}

Payment.propTypes = {
	campaign_details: PropTypes.object,
}
