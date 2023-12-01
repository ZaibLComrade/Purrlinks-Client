import bannerImage from "../../../assets/banner.jpg";
import petsImage from "../../../assets/pets.png";

export default function Banner() {
	const spanStyle = "text-primary";
	
	return <div className="relative h-full max-h-[800px] md:h-[80vh] bg-white bg-cover" style={{ backgroundImage: `url(${bannerImage})` }}>
		{/* Overlay */}
		<div className="absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-br from-black to-black/20"></div>
		
		<div className="relative z-20 flex flex-col flex-col-reverse items-center w-full h-full p-6 md:absolute gap-8 md:flex-row md:p-14">
			<div className="flex flex-col items-center justify-center w-auto text-center lg:text-center lg:w-1/2 shrink-0 md:shrink md:text-left gap-4 lg:gap-8">
				<h2 className="md:text-4xl lg:text-5xl text-3xl max-w-[550px] font-pacifico text-white">Discover Boundless <span className={ spanStyle }>Love</span> and <span className={ spanStyle }>Companionship</span></h2>
				<p className="text-white/80 font-montserrat md:text-base min-w-[200px] text-sm max-w-[500px]">
					Step into a World of Endearing Purrs and Lifelong Bonds. Our Purr-fect Companions Await, Each with a Unique Tale of Resilience and Affection.
				</p>
			</div>
			<div className="w-auto h-full lg:w-1/2">
				<img src={ petsImage } className="object-contain w-full h-full" alt="Pets catching butterfly and birds"/>
			</div>
		</div>
	</div>
}
