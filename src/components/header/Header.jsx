import PropTypes from "prop-types";
import { FaPaw } from "react-icons/fa6";

export default function Header({ title, subtitle }) {
	return <div className="justify-center max-md:max-w-[300px] mx-auto mt-20 mb-10 font-bold text-center font-nunito w-max">
		<p className="flex justify-center text-2xl items-center tracking-[4px] gap-2">
			<span>::::::</span>
			<span><FaPaw/></span>
			<span>::::::</span>
		</p>
		<h1 className="mt-4 mb-2 text-2xl md:text-4xl text-primary">{ title }</h1>
		<p className="font-medium text-subtitle">{ subtitle }</p>
	</div>
}

Header.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
}
