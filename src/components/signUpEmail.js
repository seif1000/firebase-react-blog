import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import * as db from '../firebase/db';
import * as actions from '../action';
import * as auth from '../firebase/auth';
import {Link} from 'react-router-dom';



 class SignUpEmail extends Component {
   state = {
     labelTop:false,
     error:null
   }
   keyUpHandler =()=>{
    this.setState({
      labelTop:true
    })
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
             <div className="my-3" id='input-gorup'>
                 <label 
                 className="lead"
                 style={{
                   top:this.state.labelTop?'-22px':"6px",
                   fontSize:this.state.labelTop?'14px':"16px",
                 }}
                  htmlFor="username"
                  id="label-field"
                   >
                   {field.label}
                   </label>
                 <input className=' py-1'
                 style={style}
                  onKeyDown={this.keyUpHandler}
                  type={field.type}
                   {...field.input}/>
                   <div className="text-help ">
                   {touched ? error  : ""} 
                  </div>
             </div> 
        )
       
    }
    submiHndler = (value)=>{
        const {username,password,email } = value;

        auth.doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
    
          // Create a user in your own accessible Firebase Database too
          db.doCreateUser(authUser.user.uid, username, email)
            .then(() => {
                this.props.FaceBookLogin(authUser,
                    this.props.history.push('/NewUser')) 
                    
            })
         
    
        })
        .catch(error => {
          this.setState({error:error});
        });
       
    
      
    }
  render() {
    const {handleSubmit} = this.props;
    return (
      <div >
        <form  onSubmit={handleSubmit(this.submiHndler)}>
          <Field
         
          placeholder='username'
          type='text'
           name='username'
           label='username'
          component={this.renderField}
        />
        <Field 
        placeholder='email'
         type='email'
           name='email'
          label='email'
          component={this.renderField}
        />
        <Field 
         placeholder='password'
          type='password'
           name='password'
          label='pssword'
          component={this.renderField}
        />
        
        <button type="submit"  >submit</button>
        { this.state.error && <p>{this.state.error.message}</p> }
        <p className=' mt-1'>allready have an account? <Link to='/Login'>Log in</Link> </p>
        </form>
       
      </div>
    )
  }
}

const validate=(values)=> {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};


 

  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username= "Enter a username";
  }
  if (!values.email) {
    errors.email = ( " Enter your email");
  }
  if (!values.password) {
    errors.password = "Enter your password";
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
 )(SignUpEmail);
