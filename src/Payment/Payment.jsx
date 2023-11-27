import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutFrom";
import "./stripe.css";

export default function Payment() {
	const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
	return <div>
		<h1 className="block mb-2 text-sm font-medium text-gray-900">Payment</h1>
		<div>
			<Elements stripe={stripePromise}>
				<CheckoutForm/>
			</Elements>
		</div>
	</div>
}
