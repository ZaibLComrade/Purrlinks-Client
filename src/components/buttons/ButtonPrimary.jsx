import PropTypes from "prop-types";

export default function ButtonPrimary({ text }) {
	return <button 
		className="px-5 py-3 text-sm font-semibold border-2 rounded-lg md:text-base bg-accent-2 border-accent-2 w-max text-title font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60"
	>
		{ text }
	</button>
}

ButtonPrimary.propTypes = {
	text: PropTypes.string,
}
