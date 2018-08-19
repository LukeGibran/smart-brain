import React from 'react';
import './FaceRecognition.css'
// import PropTypes from 'prop-types'

const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className = 'center ma'>
        <div className = 'absolute'> 
            <img id = 'inputImage' alt = ' ' src = {imageUrl}  width = '500px' height = 'auto' />
            <div className = 'bounding-box' style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
            </div>
        </div>
    </div>
  )
}

// Navigation.propTypes = {

// }

export default FaceRecognition;