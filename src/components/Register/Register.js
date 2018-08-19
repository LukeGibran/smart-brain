import React from 'react';
import './Register.css'
// import PropTypes from 'prop-types'

 class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            Email: '',
            Password: '',
            Name: ''
        }
    }

    onNameChange = (event) =>{
        this.setState({Name: event.target.value})
        
    }

    onEmailChange = (event) =>{
        this.setState({Email: event.target.value})
    }

    onPasswordChange = (event) =>{
        this.setState({Password: event.target.value})
    }
    onSubmitSignIn = () => {
        fetch('https://mighty-taiga-79439.herokuapp.com/register', {
            method:'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email:this.state.Email,
                password: this.state.Password,
                name: this.state.Name
            })
        }).then(response => response.json())
          .then(user => {
              if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
              }
          })
    }

     render(){
        return (
            <article className="back br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                        <legend className="f1 fw6 ph0 mh0">Register</ legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange = {this.onNameChange} className="pa2 input-reset ba bg-transparent  hover-blue w-100" type="text" name="name"  id="name-address" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent  hover-blue w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange = {this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-blue w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                        <div className="lh-copy mt3">
                        </div>
                    </div>
                </main>
            </article>
          );
     }
 
}

// Navigation.propTypes = {

// }

export default Register;