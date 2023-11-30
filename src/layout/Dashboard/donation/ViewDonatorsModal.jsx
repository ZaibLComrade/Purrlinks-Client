import PropTypes from "prop-types";
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ViewDonationModal({ setToggleModal, toggleModal, campaign_id }) {
	const axiosSecure = useAxiosSecure();
	
	const { data: donated = [], isPending: isLoading } = useQuery({
		queryKey: ["donated"],
		queryFn: async () => {
			const { data } = axiosSecure.get(`/contribution/${campaign_id}`)
			return data;
		}
	})
	console.log(donated);
	
	return (
		<>
			{/* <!-- Main modal --> */}
			<div
				tabIndex="-1"
				onClick={() => setToggleModal(false)}
				className={`overflow-y-auto ${
					toggleModal ? "block" : "hidden"
				} bg-black/50 overflow-x-hidden fixed z-50 justify-center flex items-center w-full inset-0 h-screen w-screen max-h-full`}
			>
				<div  className="relative w-full max-w-lg max-h-full p-4">
					{/* <!-- Modal content --> */}
					<div onClick={ e => e.stopPropagation() } className="relative bg-white rounded-lg shadow">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-4 border-b rounded-t md:p-5">
							<h3 className="text-xl font-semibold text-gray-900">
								Users who donated
							</h3>
							<button
								onClick={() => setToggleModal(false)}
								type="button"
								className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
								data-modal-hide="authentication-modal"
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-4 md:p-5">
							<ul className="space-y-5">
							{ !isLoading &&
								donated.map((elem, i) =><li key={ i }>
									<div className="text-xl md:text-2xl grid place-items-center grid-cols-2">
										<div>{ elem.contributer_name }</div>
										<div>{ elem.donated_amount }$</div>
									</div>
								</li>)
							}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

ViewDonationModal.propTypes = {
	setToggleModal: PropTypes.func,
	toggleModal: PropTypes.bool,
};
