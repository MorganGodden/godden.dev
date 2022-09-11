import React from 'react';
import { Link } from 'react-router-dom';
import '../css/godden.css';

// Blocks
export function ContentElement(props) {
    return (
      <div className='h3Div'>
        <p className='hash accent'>#</p>
        <h3>{props.title}: </h3>
        <ul>{(props.text != null) ? props.text : props.lines}</ul>
      </div>
    )
  }
  
export function TextLine(props) { return <p className='ElementLine'>{props.text}</p>; }

// Code repetition, optimize
export function LinkLine(props) { 
  if(!String(props.link).includes(":")) {
    return <Link to={props.link}>
      {(props.ico != null) ? <img src={props.ico} alt={''}/> : null}{props.text}
      {(props.smallText != null) && <span className='small'>{' (' + props.smallText + ')'}</span>}
    </Link>
  } else {
    return <a className='ElementLine' href={props.link} target={(props.newTab) ? "_blank" : ""} rel="noreferrer">
      {(props.ico != null) ? <img src={props.ico} alt={''}/> : null}{props.text}
      {(props.smallText != null) && <span className='small'>{' (' + props.smallText + ')'}</span>}
    </a>
  }
}

export function HoverLine(props) { return <p className='tooltip ElementLine' tooltip={props.tooltip}>{props.text}<span className='small accent'> (?)</span></p>}