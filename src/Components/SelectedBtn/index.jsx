import React from 'react'
import "./index.css"

const SelectedBtn = ({ selected, onClick, children }) => {
  return (
    <span onClick={onClick} className='select-btn'

      style={{

        backgroundColor: selected ? 'gold' : '',
        color: selected ? 'black' : '',
        fontWeight: selected ? 'bold' : '500'
      }}

    >
      {children}
    </span>
  )
}

export default SelectedBtn