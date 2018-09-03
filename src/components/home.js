import React,{Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import * as actions from '../action';
import withAuth from '../hok/withAuth';
import {withRouter} from 'react-router-dom';
import {auth} from '../firebase/firebase';
import NavWithAuth from './NavWithAuth';
import {addPosts} from '../firebase/db';
import Posts from './Posts';





 class Home extends Component{
   state = {
     body:''
   }
   componentDidMount(){
     const userId = auth.currentUser.uid;
     this.props.getExtraDta(userId)
    
   
   }
   submitHandler = (e)=>{
     let img = null;
   
if(this.props.authUser.userInformation ){
   img =this.props.authUser.userInformation.imageUrl.downloadURL ;
}else if(this.props.authUser.user.photoURL && !this.props.authUser.userInformation){
    img = this.props.authUser.user.photoURL
}

     const dateC = new Date().getTime();
      addPosts(auth.currentUser.uid,this.props.authUser.username,this.state.body,img,dateC);
      this.setState({
        body:''
      })

       e.preventDefault()
   }
  

    render(){
    let img = null;

    if(this.props.authUser.userInformation ){
      img =this.props.authUser.userInformation.imageUrl.downloadURL ;
   }else if(auth.currentUser.photoURL && !this.props.authUser.userInformation){
       img = auth.currentUser.photoURL
   }


    
        return (
          <React.Fragment>
            <NavWithAuth/>
            <div  id="Add-quetion" >
               <div className="Question d-inline-flex mb-1 p-2 ">
                 <div className="profile mr-1  ">
                   <img src={img} alt="img" className='bd-highlight'/>
                 </div>
                <div className='bd-highlight'>
                <p>{this.props.authUser.username}</p> 
              
                </div>
                  
                 
                 
               </div>
               <form className="Question-form p-2" onSubmit={this.submitHandler}>
                  <input
                  onChange={(e)=>{this.setState({body:e.target.value})}}
                  value = {this.state.body}
                   type="text"
                   className="Question-field"
                    placeholder='What is your question?'/>
                  <button  type="submit"> edit</button>
                  

               </form>
              
            
           
            </div>
            <Posts/>
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
    connect(mapStateToProps, actions)
  )(Home);
