import React from 'react'

const Popup = ({children}) => {
  return (
    <div className="popup">
      <div className="window">
        {children}
      </div>
    </div>
  )
}

export default Popup