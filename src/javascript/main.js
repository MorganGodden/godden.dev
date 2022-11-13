import React from 'react';
import { Link } from 'react-router-dom';
import '../css/godden.css';
import '../font-awesome/css/font-awesome.min.css'

// Blocks
export function ContentElement(props) {
  return (
    <div className='h3Div'>
      <p className='hash accent'>#</p>
      <h3>{props.title}: </h3>
      <ul>{props.lines}</ul>
    </div>
  )
}
  
export function TextLine(props) { return <p className='elementLine'>{props.text}</p>; }

export function LinkLine(props) { 
  var contents = <span>
    {(props.ico != null) && <i className={props.ico} alt={''}/>}
    {<span className='underline'>{props.text}</span>}
    {(props.smallText != null) && <span className='small'>{' (' + props.smallText + ')'}</span>}
  </span>

  return (!String(props.link).includes(":")) // If mailto
    ? <Link to={props.link}> {contents} </Link>
    : <a className={'elementLine'} href={props.link} target={(props.newTab) ? "_blank" : ""} rel="noreferrer">  {contents} </a>
}

export function HoverLine(props) { return <p className='tooltip elementLine' tooltip={props.tooltip}>{props.text}<span className='small accent'> (?)</span></p>}