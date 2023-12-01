import { PropagateLoader } from "react-spinners";

const loaderProps = {
	color: "#FA7592",
	number: 1,
}

const propagateLoader = <PropagateLoader color={ loaderProps.color } />

const loaderArr = [
	propagateLoader,
];


export default function LoadingScreen() {
	let random = Math.floor((Math.random() * loaderArr.length));
	const currLoader = loaderArr[random];
	
	return <div className="relative top-0 z-[1] h-screen bg-black/80">
	<div className="fixed z-[0] left-0 w-screen h-screen bg-primary/20"></div>
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			{ currLoader }
		</div>
	</div>
}
