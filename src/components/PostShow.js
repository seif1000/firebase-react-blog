import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../action/index';
import Spinner from './spinner/spinner';
import NavWithAuth from './NavWithAuth';
import Response  from './response';


class PostShow extends Component {
 
    componentWillMount(){
        const {uid,qid} = this.props.match.params;
         
        this.props.getQuestionDetails(uid,qid);
      
    }
 
  
  render() {
      const createdTime =this.props.authUser.questDetail? this.props.authUser.questDetail.createdAt:0
       const distance = new Date().getTime()- createdTime;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let currentDistance  ='just now';
    if(days===0 && hours===0){
        currentDistance = `${mins} min`
    }else{
     if(days===0 && hours!==0){
        currentDistance = `${hours} hours` 
     }else if(days!==0){
         currentDistance = `${days} days`
     }
    }
   
      if(!this.props.authUser.questDetail){
          return <Spinner/>

      }
    
    return (
        <React.Fragment>
       <NavWithAuth/>
            <div  className='mb-2 quest-detail  '>
           <div className="d-inline-flex user px-2  pt-1">
            
            <div className="profile  mr-1 bd-highlight">
                <img src={this.props.authUser.questDetail.userImage} alt="profile"/>
            </div>
            <div className='bd-highlight d-inline-flex'>
              <p >{this.props.authUser.questDetail.username}</p>
              <p className='ml-1 small'>{currentDistance}</p>
            </div>
        </div>
         <div className='Question p-2 mb-1'>
             <p className='lead'>{this.props.authUser.questDetail.body}</p>
         </div>
        
         </div>
      
         <div className='Conversation '>
         <Response/>
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
export default connect(mapStateToProps,actions)(PostShow);