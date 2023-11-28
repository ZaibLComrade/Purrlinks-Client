import PropTypes from "prop-types";
import { MdAddCircleOutline } from "react-icons/md";
import { FaCat } from "react-icons/fa";
import { IoHeartHalf } from "react-icons/io5";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { FaHome } from "react-icons/fa";

export default function Sidebar({ props }) {
	const { user } = useAuth();
	const { toggleSidebar } = props
	const email = user?.email;
	
	const utilities = [
		{ label: "Add a Pet", icon: MdAddCircleOutline, path: "/dashboard/adoption/add" },
		{ label: "My Added Pets", icon: FaCat, path: `/dashboard/adoption/my/${email}` },
		{ label: "Adoption Requests", icon: IoHeartHalf, path: `/dashboard/adoption/requests/${email}` },
		{ label: "Create Donation Campaign", icon: IoMdCreate, path: "/dashboard/donation/add" },
		{ label: "My Donation Campaigns", icon: FaDonate, path: `/dashboard/donation/my/${email}` },
		{ label: "My Donations", icon: BiSolidDonateHeart, path: `/dashboard/donation/contributed/${email}` },
	];
	const adminUtilities = [
		{ label: "Users", icon: FaUsers, path: "/dashboard/user/all" },
		{ label: "All Pets", icon: MdPets, path: "/dashboard/adoption/all" },
		{ label: "All Donations", icon: GiReceiveMoney, path: "/dashboard/donation/all" },
	]
	// const proBadge = <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full ms-3">Pro</span>
	// const numberBadge = num => <span className="inline-flex items-center justify-center w-3 h-3 p-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ms-3">{ num }</span>
	
	return <aside
		className={`fixed top-0 h-full left-0 mt-5 z-40 w-72 pt-20 bg-white border-r border-gray-200 transition-transform ${toggleSidebar ? "-translate-x-full": ""} sm:translate-x-0`}
	>    
		<div className="h-full px-3 pb-4 overflow-y-auto bg-white">
			<ul className="font-medium space-y-2">
				<li className="w-full sm:hidden">
					<Link
						to={ "/" }
						className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
					>
						<FaHome className="text-2xl text-gray-500 transition duration-75 group-hover:text-gray-900"/>
						<span className="ms-3 font-montserrat">Home</span>
					</Link>
				</li>
				<hr className="sm:hidden"/>
				{ utilities.map(({ label, icon: Icon, path }) => <li key={ path }>
					<Link
						to={ path }
						className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
					>
						<Icon className="text-2xl text-gray-500 transition duration-75 group-hover:text-gray-900"/>
						<span className="ms-3 font-montserrat">{ label }</span>
					</Link>
				</li>
				)}
				<hr/>
				{ adminUtilities.map(({ label, icon: Icon, path }) => <li key={ path }>
					<Link
						to={ path }
						className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
					>
						<Icon className="text-2xl text-gray-500 transition duration-75 group-hover:text-gray-900"/>
						<span className="ms-3 font-montserrat">{ label }</span>
					</Link>
				</li>
				)}
			</ul>
		</div>
	</aside>
}

Sidebar.propTypes = {
	props: PropTypes.object,
	toggleSidebar: PropTypes.bool,
	user: PropTypes.object,
}
