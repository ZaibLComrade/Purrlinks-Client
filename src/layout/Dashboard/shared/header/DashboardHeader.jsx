import PropTypes from "prop-types";

export default function DashboardHeader({ title }) {
	return <h1 className="mx-auto my-6 text-5xl font-medium font-montserrat w-max">{ title }</h1>
}

DashboardHeader.propTypes = {
	title: PropTypes.string,
}
