import PropTypes from "prop-types";

export default function DashboardHeader({ title }) {
	return <h1 className="mx-auto my-6 mb-8 text-3xl font-medium text-center md:text-4xl text-title font-montserrat">{ title }</h1>
}

DashboardHeader.propTypes = {
	title: PropTypes.string,
}
