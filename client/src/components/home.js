import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Navbar from './navbar'
import axios from 'axios'
//import Signup from './components/sign-up'
import Jumbotron from './Jumbotron';
import { Col, Row, Container } from "./Grid";
import API from "../utils/API";
import Jobs from '../pages/Jobs';
import Detail from '../pages/Detail';
import Listings from './Listings/index'
import Profile from './profile'
import Logo from '../Images/facebook_cover_photo_2.png'



class Home extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    const imageStyle = {
      width: 400
    }

    if (this.state.loggedIn == true && this.state.contractor == true) {
      console.log("render: I AM A CONTRACTOR")
      return (
        <div>
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn}> </Navbar>
          <Profile />
          <Listings />
        </div>
      )
    } else if (this.state.loggedIn == true && this.state.contractor == false) {
      console.log("render: I AM A HOMEOWNER")
      return (
        <div>
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn}> </Navbar>
          <Profile />
          <Jobs> </Jobs>
        </div>
      )
      //INSERT RETURN HERE
    } else {
      console.log("render: I AM NOTHING")
      //INSERT RETURN HERE
    }

    return (





      <div>
        <div id="top-filler"> <img src={Logo} className="logo" id="main_logo" style={{ width: 400 }} alt="logo" /> 
        
        </div>


        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username} email: {this.state.email}, CONTRACTOR STATUS: {this.state.contractor}!</p>
        }
        

        <div id="demo" className="carousel slide" data-ride="carousel">

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://www.concrete.org/portals/0/files/images/contractorportal_12column.jpg" alt="Los Angeles" width="100%" height="100%" />
            </div>
            <div className="carousel-item">
              <img src="http://lenoxhillconstruction.com/wp-content/uploads/2016/03/General-Contractor-1024x683.jpg" alt="Chicago" width="100%" height="100%" />
            </div>
            <div className="carousel-item">
              <img src="https://www.cm3.com.au/www/responsive/images/frontpage/for-clients.jpg" alt="New York" width="100%" height="100%" />
            </div>
          </div>

        </div>

      </div>
    )

  }
}

export default Home