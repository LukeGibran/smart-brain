import React from 'react';


// import PropTypes from 'prop-types'

const Rank = ({name, entries}) => {
  return (
    <div >
        <div className = 'white f3'>
        { `${name}, your current rank is ...`}
        </div>
        <br />
        <div className = 'white f1'>
        {entries}
        </div>
    </div>
  )
}

// Navigation.propTypes = {

// }

export default Rank;