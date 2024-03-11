import { ContentElement, TextLine, LinkLine, HoverLine } from '../main.js';

import Header from '../header';
import Footer from '../footer';

// Link Variables
const GITHUB = 'https://github.com/MorganGodden';
const GITHUB_WEBSITE = 'https://github.com/MorganGodden/godden.dev';
const GITHUB_SPACETERMINAL = 'https://github.com/MorganGodden/SpaceTerminal';
const BFRD = 'https://hackathon.bfrd.uk';
const ITCHIO = 'https://goddendev.itch.io/';
const LINKEDIN = 'https://www.linkedin.com/in/morgan-godden/';
const MAIL = 'mailto:morgan.godden@outlook.com';

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
							<LinkLine text='The SpaceTerminal Client' link={GITHUB_SPACETERMINAL} newTab={true} smallText={'github'} />,
							<LinkLine text='Rolls Royce Hackathon' link={BFRD} newTab={true} smallText={'bfrd.uk'} />,
							<LinkLine text='Game-Jams' link={ITCHIO} newTab={true} smallText={'itch.io'} />, <br />,
							<LinkLine text='This Website' link={GITHUB_WEBSITE} newTab={true} smallText={'github'} />,
						]}
					/>
					<ContentElement title='Features' lines={[
							<HoverLine text='Front-end Development' tooltip='Next.js, Electron, TS, SASS, Webpack...' />,
							<HoverLine text='Back-end Development' tooltip='Express.js, Linux, Apache, SQL, PHP...' />,
							<HoverLine text='Games Development' tooltip='C#, C++, Unity, DirectX' />,
							<HoverLine text='Design Tools' tooltip='Blender, Figma, Krita' />,
						]}
					/>
					<ContentElement title='Socials' lines={[
							<LinkLine ico={'fa-brands fa-github'} text="Github" link={GITHUB} newTab={true} />,
							<LinkLine ico={'fa-brands fa-linkedin-square'} text="LinkedIn" link={LINKEDIN} newTab={true} />,
							<LinkLine ico={'fa-solid fa-envelope'} text="Mail" link={MAIL} newTab={true} />,
						]}
					/>
				</div>
				<Footer />
			</div>
		</div>
	);
}
