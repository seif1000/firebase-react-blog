import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {provider,auth} from '../firebase/firebase';
import * as db from '../firebase/db';
import * as actions from '../action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class SignUpFacebook extends Component {

  
  loginFacebook = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
         if(auth.currentUser.metadata.creationTime===auth.currentUser.metadata.lastSignInTime){
          db.doCreateUser(result.user.uid,result.user.displayName,result.user.email)
          .then(
            
               this.props.FaceBookLogin(result.user,
                 this.props.history.push('/newUser'))  
             
              
             
               
          )
       
         }else{
          this.props.FaceBookLogin(result.user,
            this.props.history.push('/Home'))  
         }
        
        
       
      })
     
  }
 
 
 
 

  render() {
   
   
    return (
      <div className='App'>
        <p >sign Up with facebook</p>
          
        <button id='facebook' onClick={this.loginFacebook}>
        <FontAwesomeIcon icon={['fab', 'facebook-square']} className='mr-2' />facebook
        
        </button>
       
        <p className="  mt-2">or with email</p>
       </div>
    );
  }
}



export default compose(
  connect(null,actions),
  withRouter,
 )(SignUpFacebook);
