import React from 'react'
import spinner from './spinner.gif';

function Spinner() {
  return (
    <>
      <img 
        src={spinner} 
        alt="loading..." 
        style={
          { 
            width: '200px',
            margin: 'auto', 
            display: 'block' 
          }
        } />
    </>
  )
}

export default Spinner
