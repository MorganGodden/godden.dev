import { ContentElement, TextLine, LinkLine, HoverLine } from '../main.js';

import Header from '../header';
import Footer from '../footer';

// Link Variables
var github = 'https://github.com/MorganGodden';
var github_website = 'https://github.com/MorganGodden/godden.dev';
var notion_cv = 'https://jstrieb.github.io/link-lock/#eyJ2IjoiMC4wLjEiLCJlIjoiRUM3ZmZzanlIZ3FxSXlGZWF5d1hJWWY4NFRnbkNCOGtFQmlFL1N0K1ZDNUxpYjJuYm1sc1NxcG5wUllEOHdCY3VmS2RBMVhGZE1KSDhQYVVDWlpiOFp2WGdkU2lpS21veHpXVHRBUVNsMFZRMU10QmswZ2dyT3o5V1h4d2oyOXVWQVRYS3c9PSIsImgiOiJQYXNzd29yZCBwcm92aWRlZCBieSBNb3JnYW4uIiwicyI6IkRRTlc0Y2d1aVNySnRyYk1OSmVrQUE9PSIsImkiOiJCM2JQWVFNQStCQ1VlWWdVIn0=';
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
							<LinkLine text='Resumé' link={notion_cv} newTab={true} smallText={'Notion'} />,
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
