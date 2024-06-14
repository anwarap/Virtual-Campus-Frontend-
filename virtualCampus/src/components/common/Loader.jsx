import React from 'react'
import { BarLoader, BeatLoader, CircleLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div>
    <BarLoader color={'#3498db'} size={80} />
    {/* <BeatLoader color={'#f44336'} size={100} />
    <CircleLoader color={'#e74c3c'} size={120} /> */}
  </div>
  )
}

export default Loader
