import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import * as actions from '../action';
import * as auth from '../firebase/auth';
import LoginInFacebook  from './loginWithFacebook';
import {Link} from "react-router-dom";
import NavbarWithOutAuth from './navbarWithOutAuth';


 class Login extends Component {
  
    state = {
      labelTop:false,
      error:null,
    }
   

    renderField =(field)=>{
      const {meta:{touched,error}} = field;
      let style={}
      if(touched && error){
        style={
         borderBottomColor: 'red',
         borderBottomWidth: 1,
        }
      }

        return(
             <div id='input-gorup' className='my-3 text-center'>
                 <label style={{top:this.state.labelTop?'-22px':"6px",}}  htmlFor="username">{field.label}</label>
                 <input style={style}  className=' py-1' onKeyDown={()=>{this.setState({ labelTop:true})}} type={field.type} {...field.input}/>
                 <div className="text-help ">
                   {touched ? error  : ""} 
                  </div>
            </div> 
        )
       
    }
    submiHndler = (value)=>{
        const {password,email } = value;

        auth.doSignInWithEmailAndPassword(email, password)
        .then((authUser) => {
          
            this.props.FaceBookLogin(authUser,
                this.props.history.push('/Home')) 
        })
        .catch(error => {
          this.setState({error:error});
        });
       
    
      
    }
  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <NavbarWithOutAuth/>
        <div id='showcase'>
      <div id='wel-form' className='shadow' style={{marginTop:"60px",marginBottom:"60px"}}>
        <LoginInFacebook/>
        <form  onSubmit={handleSubmit(this.submiHndler)}>
        <Field 
         type='email'
           name='email'
          label='email'
          component={this.renderField}
        />
        <Field 
          type='password'
           name='password'
          label='pssword'
          component={this.renderField}
        />
        <button type="submit" >submit</button>
        { this.state.error && <p>{this.state.error.message}</p> }
        </form>
              <p> you do not have account?<Link className="mt-2" to='/'>Join now </Link></p> 
      </div>
      </div>
      </div>
       
    )
  }
}

const validate=(values)=> {
 
  const errors = {};


 

  
  if (!values.email) {
    errors.email = ( " Enter your email");
  }
  if (!values.password) {
  
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}



export default compose(
  connect(null,actions),
  withRouter,
  reduxForm({
      validate,
      form:"signup"
  })
 )(Login);
