import { ContentElement, TextLine, LinkLine, HoverLine } from '../main.js';

import ico_github from '../../icons/github.png';
import ico_linkedin from '../../icons/linkedin.png';
import ico_mail from '../../icons/mail.png';

import Header from '../header';
import Footer from '../footer';

// Link Variables
var github = 'https://github.com/MorganGodden';
var github_website = "https://github.com/MorganGodden/godden.dev";
var linkedIn = 'https://www.linkedin.com/in/morgan-godden/';
var mail = 'mailto:morgan.godden@outlook.com';


// Main App
export default function Home() { 
    return (
    <div>
      <p id='mobileText'>Mobile Version is Under Construction.</p>
      <div id='content'>
        <Header />
  
        <ContentElement title="Position" lines={[
          <TextLine text='Software Engineer'/>,
        ]}/>
        <ContentElement title="Contact" lines={[
          <LinkLine text='GitHub' ico={ico_github} link={github} newTab={true}/>,
          <LinkLine text='LinkedIn' ico={ico_linkedin} link={linkedIn} newTab={true}/>,
          <LinkLine text='Mail' ico={ico_mail} link={mail} newTab={true}/>
        ]}/>
        <ContentElement title="Projects" lines={[
          <LinkLine text="This Website" link={github_website} newTab={true} smallText={'Github'}/>, <br/>,
          <LinkLine text="Game Jams & Hackathons" link={'./projects'}/>
        ]}/>
        <ContentElement title="Features" lines={[
          <HoverLine text="Front-end Web Dev" tooltip="React, SASS"/>,
          <HoverLine text="Back-end Web Dev" tooltip="LAMP Stack"/>,
          <HoverLine text="Game Development Tools" tooltip="Unity, Blender"/>
        ]}/>
  
        <Footer />
      </div>
    </div>
    )
  }