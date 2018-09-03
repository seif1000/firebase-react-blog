import React,{Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import * as actions from '../action';
import withAuth from '../hok/withAuth';
import {withRouter} from 'react-router-dom';
import {auth} from '../firebase/firebase';
import { Field, reduxForm } from 'redux-form';
import userImg from '../asset/user.png';
import * as db from '../firebase/db';
import NavbarWithOutAuth from './navbarWithOutAuth';


 class NewUserHome extends Component{
     state = {
        picture: null,
        show:false
       
         
      
     }
   componentDidMount(){
     this.props.getUserName();
    

   
   }
   renderField =(field)=>{
      return(
           <div className="my-3" id='input-gorup'>
               <label  className="lead" id="label-field" > {field.label} </label>
               <input className=' py-1 form-control' type={field.type} {...field.input} required={true}/>
            
           </div> 
      )
     
  }
 imageChange = (e)=>{
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
   
      this.setState({
        picture: file,
      
      });
    };
    reader.readAsDataURL(file);
 }
 uploadImage = (e)=>{
   
      this.props.getImage(this.state.picture.name,this.state.picture);
      this.setState(prevState=>{
          return{
              show:!prevState.show
          }
      })

      
      

}
 submiHndler = (value)=>{

      const id = auth.currentUser.uid;
      db.addDataUser(id,value.firstname,value.lastname,value.job,this.props.authUser.downUrl)
      this.props.history.push('/Home')
    
       
 }
 

    render(){
   
      
       
        const {handleSubmit} = this.props;

        let prog = 0;
        if(this.props.authUser.downUrl){
           prog= this.props.authUser.downUrl.progress
        }
        return (
            <React.Fragment>
             <NavbarWithOutAuth/>
            <div className="container shadow my-5 py-4 wellcom">
            <p className='lead '>{`Hello ,${this.props.authUser.username} thanks for register`}</p>
                <div className="row">
                    <div className="col-md-4 pt-3">
                        <img src={auth.currentUser.photoURL?auth.currentUser.photoURL:userImg} alt="" width="150" height="150"/>
                        <div id="filesubmit" className='form-group'>
                           <input onChange={this.imageChange} type="file" class="file-select mt-1" accept="image/*"/>
                           <button onClick={this.uploadImage} 
                           className="file-submit btn btn-default mt-2" 
                           disabled={this.state.picture?false:true}
                           >modifier</button>

                         { 
                             this.state.show ? 
                             <div>
                             <div class="progress mt-2">
                             <div class="progress-bar bg-success" role="progressbar" style={{width:`${prog}%` }} aria-valuenow={`${prog}%`} aria-valuemin="0" aria-valuemax="100"></div>
                              
                           </div>
                          {this.props.authUser.downUrl && this.props.authUser.downUrl.progress===100?<p>image uploaded successfully</p>: <p>loading...</p>}
                            </div>:null}
                    </div>
                    </div>
                   
                    <div className="col-md-8">
                    <form  className='form-group' onSubmit={handleSubmit(this.submiHndler)}>
                         <Field
                        placeholder='first name'
                        type='text'
                        name='firstname'
                        label='first name'
                        component={this.renderField}
                         />
                       <Field 
                        placeholder='lastname'
                        type='text'
                        name='lastname'
                        label='last name'
                        component={this.renderField}
                        />
                       <Field 
                       placeholder='your job'
                      type='your job'
                      name='job'
                      label='your job'
                      component={this.renderField}
                       />
                      <button type="submit"  disabled={this.props.authUser.downUrl||auth.currentUser.photoURL ?false:true} className='btn btn-success'>submit</button>
                    
       
                    </form>
        </div>
        </div>
          
          
        </div>
       
            </React.Fragment>
             
           
         
           
      
           
          )
    }
 } 

 
 
 

const mapStateToProps = (state)=>{
    return{
        authUser:state.auth
    }
}

export default compose(
    withAuth,
    withRouter,
    connect(mapStateToProps, actions),
    reduxForm({
        form:"signup"
    })
  )(NewUserHome);
