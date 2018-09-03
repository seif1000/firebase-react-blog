import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {provider,auth} from '../firebase/firebase';
import * as db from '../firebase/db';
import * as actions from '../action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class LoginInFacebook extends Component {
 
  
  loginFacebook = () => {
    auth.signInWithPopup(provider)
      .then(({ user }) => {
        
         db.doCreateUser(user.uid,user.displayName,user.email)
         .then(
            this.props.FaceBookLogin(user,
            this.props.history.push('/Home')) 
           
         )
        
       
      })
  }

 
 
 

  render() {
 
    return (
      <div className='App'>
        <p >Log in with facebook</p>
          
        <button id='facebook' onClick={this.loginFacebook}>
        <FontAwesomeIcon icon={['fab', 'facebook-square']} /> facebook
        </button>
       
        <p className="  mt-2">or with email</p>
       </div>
    );
  }
}



export default compose(
  connect(null,actions),
  withRouter,
 )(LoginInFacebook);