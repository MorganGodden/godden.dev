import Header from '../header';
import Footer from '../footer';

var fissionProject = 'https://hackathon.bfrd.uk/index.php';

export default function Projects() { 
    return (
    <div  id='content'>
        <Header />
        <div>
            <div id='contentBacking'/>
            <a href='../' className='backBtn'>{'◄'}</a>
            <h2>Game Jams & Hackathons</h2>
            <div className='webPreview'>
                <img alt='' src="fissionLogo.png"/>
                <ul>
                    <a className='underline' href={fissionProject} target="_blank" rel='noreferrer'>The Fission Project</a>
                    <p>Role: <b>Web Developer</b></p>
                    <p>Joint 1st place entry into a Rolls Royce hackathon. The event focused on raising awareness in today's youth about sustainable power generation.</p>
                </ul>
            </div>
            <iframe title='Idle n Die' frameborder="0" src="https://itch.io/embed/1622418?dark=true" width="552" height="167"><a href="https://goddendev.itch.io/idle-n-die">Idle n Die by godden.dev</a></iframe>
            <br/>
        </div>
        <Footer />
    </div>
    ) 
}