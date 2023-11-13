import  React from 'react';

function Expenses(props){
  return (
        <li className="concept">
          <img src= {props.image} alt= {props.title} />
          <h2>TODO: {props.title}</h2>
          <p>TODO: {props.description}</p>
        </li>
  )
}

export default Expenses;