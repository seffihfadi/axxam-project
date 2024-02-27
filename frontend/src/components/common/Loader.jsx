import { useEffect, useState } from 'react';

const Loader = ({ msg }) => {
  return (
    <div className='loading'>
      <div className="circul_loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle
            className="path"
            cx={50}
            cy={50}
            r={20}
            fill="none"
            strokeWidth={2}
            strokeMiterlimit={10}
          />
        </svg>
      </div>
      { msg && <p className='capitalize text-sm'>{ msg }</p> }
    </div>
  )
}
export default Loader