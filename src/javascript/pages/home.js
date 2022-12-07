import { ContentElement, TextLine, LinkLine, HoverLine } from '../main.js';

import Header from '../header';
import Footer from '../footer';

// Link Variables
var github = 'https://github.com/MorganGodden';
var github_website = 'https://github.com/MorganGodden/godden.dev';
var resume_pdf = 'https://jstrieb.github.io/link-lock/#eyJ2IjoiMC4wLjEiLCJlIjoiSWp1WjZERGJyT0hOZ2VxNUJmNXRWYUI0N2xabmNKRGlFSkNhWE81NWpBS1BwVHlTWEJPK0lxVXJXcDBtM1hUR21qdGFCZUptWHhmYS9qSGF3NEgrS1U4NzNHazVQS0ZOTkE9PSIsImgiOiJQYXNzd29yZCBwcm92aWRlZCBieSBNb3JnYW4uIiwicyI6ImwxS3hrcGIwQ1hvK2JTZTFuSS9iL0E9PSIsImkiOiIxYk1PNng5a3JMd1I3ZWlVIn0=';
var linkedIn = 'https://www.linkedin.com/in/morgan-godden/';
var mail = 'mailto:morgan.godden@outlook.com';

// Main App
export default function Home() {
	return (
		<div>
			<p id='mobileText'>Mobile Version is Under Construction.</p>
			<div id='content'>
				<Header />
				<div>
					<div id='contentBacking' />
					<ContentElement title='Position' lines={[<TextLine text='Software Engineer' />]} />
					<ContentElement title='Details' lines={[
							<LinkLine text='Resumé' link={resume_pdf} newTab={true} smallText={'PDF'} />,
						]}
					/>
					<ContentElement title='Projects' lines={[
							<LinkLine text='This Website' link={github_website} newTab={true} smallText={'Github'} />,
							<br />,
							<LinkLine text='Game Jams & Hackathons' link={'./projects'} />,
						]}
					/>
					<ContentElement title='Features' lines={[
							<HoverLine text='Front-end Development' tooltip='React, Electron, CSS Pre-Processors...' />,
							<HoverLine text='Back-end Development' tooltip='LAMP Stack' />,
							<HoverLine text='Games Development' tooltip='C#, C++, Unity, Blender' />,
						]}
					/>
					<ContentElement title='Socials' lines={[
							<LinkLine ico={'fa-brands fa-github'} text="Github" link={github} newTab={true} />,
							<LinkLine ico={'fa-brands fa-linkedin-square'} text="LinkedIn" link={linkedIn} newTab={true} />,
							<LinkLine ico={'fa-solid fa-envelope'} text="Mail" link={mail} newTab={true} />,
						]}
					/>
				</div>
				<Footer />
			</div>
		</div>
	);
}
