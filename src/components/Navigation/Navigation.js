import React from 'react'
// import PropTypes from 'prop-types'

const Navigation = ({onRoutechange, isSignedIn}) => {
  
    if(isSignedIn){
    return (
    <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick = { () => onRoutechange('signout')} className = 'f3 link dim white pa3 pointer'>Sign Out</p>
    </nav>
      )
    } else{
      return(
      <div>
        <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick = { () => onRoutechange('signin')} className = 'f3 link dim white pa3 pointer'>Sign In</p>
        <p onClick = { () => onRoutechange('register')} className = 'f3 link dim white pa3 pointer'>Register</p>
        </nav>
      </div >
       );
    }
  
}

// Navigation.propTypes = {

// }

export default Navigation;