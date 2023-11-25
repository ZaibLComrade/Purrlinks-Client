import faqData from "./faqData";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';
import faqImage from "../../../assets/faq.png";
import Header from "../../../components/headers/Header";

export default function Faq() {
	return (
		<div className="container mx-auto">
			<Header title="Frequently Asked Questions" subtitle="Doubts that you may have"/>
			<div className="grid grid-cols-1 md:grid-cols-2">
				<div className="place-self-center">
					<img src={ faqImage } alt="Question mark"/>
				</div>
				<div className="flex items-center">
					<Accordion className="w-full">
						{faqData.map(({ panelId, question, answer }) => (
							<AccordionItem key={ panelId }>
								<AccordionItemHeading>
									<AccordionItemButton>
										{ question }
									</AccordionItemButton>
								</AccordionItemHeading>
								<AccordionItemPanel>{ answer }</AccordionItemPanel>
							</AccordionItem>
						))}
					</Accordion>{" "}
				</div>
			</div>
		</div>
	);
}
