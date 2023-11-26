import PropTypes from "prop-types";
import { MdAddCircleOutline } from "react-icons/md";
import { FaCat } from "react-icons/fa";
import { IoHeartHalf } from "react-icons/io5";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";

export default function Sidebar({ props }) {
	const { toggleSidebar } = props
	
	const utilities = [
		{ id:"1", label: "Add a Pet", icon: MdAddCircleOutline },
		{ id:"2", label: "My Added Pets", icon: FaCat },
		{ id:"3", label: "Adoption Requests", icon: IoHeartHalf },
		{ id:"4", label: "Create Donation Campaign", icon: IoMdCreate },
		{ id:"5", label: "My Donation Campaigns", icon: FaDonate },
		{ id:"6", label: "My Donations", icon: BiSolidDonateHeart },
	];
	// const proBadge = <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full ms-3">Pro</span>
	// const numberBadge = num => <span className="inline-flex items-center justify-center w-3 h-3 p-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ms-3">{ num }</span>
	
	return <aside
		className={`fixed top-0 left-0 mt-5 z-40 w-72 h-screen pt-20 bg-white border-r border-gray-200 transition-transform ${toggleSidebar ? "-translate-x-full": ""} sm:translate-x-0`}
	>    
		<div className="h-full px-3 pb-4 overflow-y-auto bg-white">
			<ul className="font-medium space-y-2">
				{ utilities.map(({ label, icon: Icon, id }) => <li key={ id }>
					<a
						href="#"
						className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
					>
						<Icon className="text-2xl text-gray-500 transition duration-75 group-hover:text-gray-900"/>
						<span className="ms-3 font-montserrat">{ label }</span>
					</a>
				</li>
				)}
			</ul>
		</div>
	</aside>
}

Sidebar.propTypes = {
	props: PropTypes.object,
	toggleSidebar: PropTypes.bool,
}
