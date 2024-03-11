import { ContentElement, TextLine, LinkLine, HoverLine } from '../main.js';

import Header from '../header';
import Footer from '../footer';

// Link Variables
var github = 'https://github.com/MorganGodden';
var github_website = 'https://github.com/MorganGodden/godden.dev';
var github_spaceTerminal = 'https://github.com/MorganGodden/SpaceTerminal';
var itchio = 'https://goddendev.itch.io/';
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
					<ContentElement title='Projects' lines={[
							<LinkLine text='The SpaceTerminal Client' link={github_spaceTerminal} newTab={true} smallText={'github'} />,
							<LinkLine text='Rolls Royce Hackathon' link={'./projects'} smallText={'bfrd.uk'} />,
							<LinkLine text='Game-Jams' link={itchio} smallText={'itch.io'} />, <br />,
							<LinkLine text='This Website' link={github_website} newTab={true} smallText={'github'} />,
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
