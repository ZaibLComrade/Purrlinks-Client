import Header from "../../../components/header/Header";
import purrImg1 from "../../../assets/embrace-purr1.jpg";
// import purrImg2 from "../../../assets/embrace-purr-2.jpeg";

export default function WhyUs() {
	return <div className="">
		<Header 
			title="Embrace Love, Change a Life"
			subtitle="Adopt Happiness Today at PurrLinks"
		/>
		<div className="px-6 pb-14 lg:gap-8 gap-4 place-items-center grid grid-cols-1 lg:grid-cols-2">
			<div className="">
				<div>
					<img src={ purrImg1 } className="object-cover w-full h-full rounded-lg" />
				</div>
			</div>
			
			<div className="flex flex-col">
				<h3 className="mb-3 text-3xl font-montserrat text-secondary-1">Open Your Heart to a Furry Companion</h3>
				<p className="text-subtitle font-opensans text-lg max-w-[500px]">Embark on a heartwarming journey of companionship at PurrLinks. Our mission is to unite loving homes with furry friends, creating moments of joy and unconditional love. By choosing to adopt, you&apos;re not just bringing a pet into your life, you&apos;re opening your heart to a lifelong companion. Be part of a story where every purr tells a tale of happiness and newfound connections. Join us in making a difference.</p>
				<button className="px-5 py-3 mt-8 border-2 rounded-lg bg-accent-2 border-accent-2 w-max text-title font-montserrat transition delay-50 ease-in-out hover:bg-accent-2/60">Adopt Now</button>
			</div>
		</div>
	</div>
}
