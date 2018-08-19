import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';




const particles = {
  particles: {

        number: {
          value: 200,
          density:{
            enable: true,
            value_are: 1000,
          }
        }
      }
    
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({user:{
      id:data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joines
    }})
  }

  calculateFaceLocation = (data) => {
   const clarifyFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputImage');
   const width = Number(image.width);
   const height = Number(image.height);
   console.log(clarifyFace.left_col * width);
   return {
     leftCol: clarifyFace.left_col * width,
     topRow: clarifyFace.top_row * height,
     rightCol: width - (clarifyFace.right_col * width),
     bottomRow: height - (clarifyFace.bottom_row * height)
   }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onButtonSubmit = () =>{
        this.setState ({imageUrl: this.state.input})
        
        fetch('https://mighty-taiga-79439.herokuapp.com/imageUrl',{
          method:'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
          input:this.state.input,
          })
        })
        .then(response => response.json())
        .then(response => {
          if(response){
            fetch('https://mighty-taiga-79439.herokuapp.com/image',{
              method:'put',
              headers: {'Content-type': 'application/json'},
              body: JSON.stringify({
              id:this.state.user.id,
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            }).catch(console.log)


          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
    this.setState({isSignedIn: false,imageUrl: ''});
    } else if (route === 'home') {
      this.setState ({isSignedIn: true});
    }

    this.setState({route: route});
  }
  render() {
    const { isSignedIn, imageUrl, box } = this.state;
    return (
      <div className="App">
      <Particles  
              className = 'particles'
              params={particles}
      />
       <Navigation isSignedIn = {isSignedIn} onRoutechange = {this.onRouteChange}/>
       {
        this.state.route === 'home'
        ? <div> <Logo />
          <Rank name = {this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
          <FaceRecognition box = {box} imageUrl = {imageUrl}/> 
          </div>
         
        
        :(
          this.state.route === 'signin'
          ?<SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/> 

          :<Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
        )
       
       }
      </div>
       
    );
  }
}

export default App;
