import Header from "../../../components/headers/Header";
import purrImg1 from "../../../assets/embrace-purr1.jpg";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
// import purrImg2 from "../../../assets/embrace-purr-2.jpeg";

export default function WhyUs() {
	return <div className="">
		<Header 
			title="Embrace Love, Change a Life"
			subtitle="Adopt Happiness Today at PurrLinks"
		/>
		<div className="px-6 pb-14 lg:gap-8 gap-8 place-items-center grid grid-cols-1 lg:grid-cols-2">
			<div className="">
				<div>
					<img src={ purrImg1 } className="object-cover w-full h-full rounded-lg" />
				</div>
			</div>
			
			<div className="flex flex-col">
				<h3 className="mb-3 text-xl md:text-3xl font-montserrat text-secondary-1">Open Your Heart to a Furry Companion</h3>
				<p className="text-subtitle font-opensans text-sm md:text-lg max-w-[500px]">Embark on a heartwarming journey of companionship at PurrLinks. Our mission is to unite loving homes with furry friends, creating moments of joy and unconditional love. By choosing to adopt, you&apos;re not just bringing a pet into your life, you&apos;re opening your heart to a lifelong companion. Be part of a story where every purr tells a tale of happiness and newfound connections. Join us in making a difference.</p>
				<ButtonPrimary text="Adopt Now"/>
			</div>
		</div>
	</div>
}
