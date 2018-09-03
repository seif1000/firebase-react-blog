import React, { Component } from 'react';
import {compose} from 'redux';
import{ connect } from 'react-redux';
import * as actions from '../action/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {withRouter }from 'react-router-dom';
 class Posts extends Component {
   
 componentWillMount(){
      this.props.getPosts();
    }
    componentDidUpdate(){
        this.props.getPosts(); 
    }

   showPost = (uid,qid)=>{
    this.props.history.push(`/Home/Post/${uid}/${qid}`)
    }
  render() {
    const posts = [];
    for(let userId in this.props.authUser.posts ){
        for(let quest in this.props.authUser.posts[userId]){

       
        posts.push(
          { 
               userid:userId,
               questions:{
                   questId:quest,
                 questionBody:this.props.authUser.posts[userId][quest]
               }
            }

        )
    }
}
 
const question = posts.map((p,i)=>{
    const distance = new Date().getTime()- p.questions.questionBody.createdAt;
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
   
    return(
    <li key={i} className='mb-2 p-2' >
        <div className="d-inline-flex">
            
            <div className="profile mr-1 bd-highlight">
                <img src={p.questions.questionBody.userImage} alt="profile"/>

            </div>
            <div className='bd-highlight d-inline-flex'>
              <p >{p.questions.questionBody.username}</p>
              <p className='ml-1 small'>{currentDistance}</p>
            </div>
        </div>
         <div>
             <p className='lead'>{p.questions.questionBody.body}</p>
         </div>
       
             <div style={{cursor:'pointer'}} className='view'>
                <p  onClick={(uid,qid)=>this.showPost(p.userid,p.questions.questId) } >view  <FontAwesomeIcon icon="arrow-right"className='mr-2' color='lightgrey'/> </p>
             </div>
       
        </li>
        )
})
    
   
    return (
      <div>
        <ul className='Posts p-2'>
          {question}
         
        </ul>
        
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
    return{
        authUser:state.auth
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps,actions)
)(Posts);
