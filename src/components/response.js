import React, { Component } from 'react'
import {connect} from 'react-redux';
import {auth} from '../firebase/firebase';
import {addresponse} from '../firebase/db';
import {compose} from 'redux';
import{withRouter} from 'react-router-dom';
import * as actions from '../action/index';
import userImg from '../asset/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 class Response extends Component {
   
    state = {
        answer:"",
     
    }
    componentDidMount(){
        const {qid} = this.props.match.params;
         this.props.getAnswers(qid)
         this.props.getUserName()
         this.props.getExtraDta()
        
     
         
     }
     componentWillUpdate(){
        const {qid} = this.props.match.params;
        this.props.getAnswers(qid)
     }

    onAddResponse = (e)=>{
        const id = auth.currentUser.uid;
        const {qid} = this.props.match.params;
        let img = userImg;
if(this.props.authUser.userInformation ){
   img =this.props.authUser.userInformation.imageUrl.downloadURL ;
}else if(this.props.authUser.user.photoURL && !this.props.authUser.userInformation){
    img = this.props.authUser.user.photoURL
}
        addresponse(qid,id,this.state.answer,this.props.authUser.username,img);
        this.setState({
            answer:''
        })
       e.preventDefault();
    }
 
     



  render() {
     
    const resp = [];
    for(let userId in this.props.authUser.responses ){
        for(let res in this.props.authUser.responses[userId]){

       
        resp.push(
          { 
               userid:userId,
               response:{
                   responseId:res,
                  RespnsesBody:this.props.authUser.responses[userId][res]

               
               }
            }

        )
    }
}
let img = userImg;
if(this.props.authUser.userInformation ){
   img =this.props.authUser.userInformation.imageUrl.downloadURL ;
}else if(this.props.authUser.user.photoURL && !this.props.authUser.userInformation){
    img = this.props.authUser.user.photoURL
}

      const respnses = resp.map(res=>{
          return(
           
              <li className='mt-1'>
                  <div className='d-inline-flex'>
                  <img className='mr-1' src={res.response.RespnsesBody.img} alt=""width='25px' height='20px' style={{borderRadius:'50%'}}/>
                  <p className='mr-1' style={{color: '#00b300'}}>{res.response.RespnsesBody.username}</p>
                  <FontAwesomeIcon icon="reply"className='mr-2' color='lightgrey'/>
                  </div>
               
                 <div className='response-body py-2 px-1'>
                 <p>{res.response.RespnsesBody.body}</p> 
                 </div>

                 
              </li>
          )
      })
     
     
    
    return (
        <div>
        <p className="lead mt-2 answers">
         <FontAwesomeIcon icon="comment-alt"className='mr-2' color='green'/>{resp.length} answers
         </p>
        <div className='mt-2'>
        <div className="mr-1 d-inline-flex" >
            
           <img src={img} alt="" className='mr-2' width='30px' height='30px'/>
           <div >
               <p>{this.props.authUser.username}</p>  
           </div>
           
        </div>
        <form  onSubmit={this.onAddResponse} className='mt-1'>
             <input onChange={(e)=>{this.setState({answer:e.target.value})}} value={this.state.answer} type="text" name="" id=""/>
             <button type="submit">add</button>
         </form>
        </div>
      <ul>
            {respnses}
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
    connect(mapStateToProps, actions))(Response)