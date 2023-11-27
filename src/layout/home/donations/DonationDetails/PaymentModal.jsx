import PropTypes from "prop-types";
import Payment from "../../../../Payment/Payment";

export default function PaymentModal({ toggleModal, setToggleModal }) {
	return (
		<div
			tabIndex="-1"
			onClick={() => setToggleModal(false)}
			className={`overflow-y-auto ${
				toggleModal ? "block" : "hidden"
			} bg-black/50 overflow-x-hidden fixed z-50 justify-center flex items-center w-full inset-0 h-screen w-screen max-h-full`}
		>
			<div className="relative w-full max-w-md max-h-full p-4">
				{/* <!-- Modal content --> */}
				<div onClick={ e => e.stopPropagation() } className="relative bg-white rounded-lg shadow">
					{/* <!-- Modal header --> */}
					<div className="flex items-center justify-between p-4 border-b rounded-t md:p-5">
						<h3 className="text-lg font-semibold text-gray-900">
							Contribute
						</h3>
						<button
							type="button"
							onClick={ () => setToggleModal(false) }
							className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
							data-modal-toggle="crud-modal"
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
						<Payment/>

					</div>
				</div>
			</div>
		</div>
	);
}

PaymentModal.propTypes = {
	toggleModal: PropTypes.bool,
	setToggleModal: PropTypes.func,
};
