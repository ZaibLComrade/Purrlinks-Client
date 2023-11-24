import bannerImage from "../../../assets/banner.jpg";
import petsImage from "../../../assets/pets.png";

export default function Banner() {
	const spanStyle = "text-primary";
	
	return <div className="relative h-[80vh] bg-cover bg-white" style={{ backgroundImage: `url(${bannerImage})` }}>
		{/* Overlay */}
		<div className="absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-br from-black to-black/10"></div>
		
		<div className="absolute z-20 flex flex-col flex-col-reverse w-full h-full gap-8 md:flex-row p-14">
			<div className="flex flex-col items-start justify-center w-auto text-center lg:w-1/2 shrink-0 md:shrink md:text-left gap-4 lg:gap-8">
				<h2 className="md:text-4xl lg:text-5xl text-3xl max-w-[550px] font-pacifico text-white">Discover Boundless <span className={ spanStyle }>Love</span> and <span className={ spanStyle }>Companionship</span></h2>
				<p className="text-white/80 font-montserrat md:text-base min-w-[200px] text-sm max-w-[500px]">
					Step into a World of Endearing Purrs and Lifelong Bonds. Our Purr-fect Companions Await, Each with a Unique Tale of Resilience and Affection.
				</p>
			</div>
			<div className="w-auto h-full lg:w-1/2 grow">
				<img src={ petsImage } className="object-contain w-full h-full" alt="Pets catching butterfly and birds"/>
			</div>
		</div>
	</div>
}
