import img from "../../assets/404.png";

export default function NotFound() {
	return <div className="relative h-[80vh]">
		<div className="absolute w-full text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<div className="max-w-[700px] mx-auto">
				<img src={ img } alt="404"/>
			</div>
		</div>
	</div>
}
