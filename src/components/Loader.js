import React from 'react';
import '../css/Loader.css';

const Loader = () => {
  return (
    <div className='lds_ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default Loader;