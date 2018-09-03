import React, { Component } from 'react';
import * as actions from '../action';
import  {auth} from "../firebase/firebase";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import userImg from '../asset/user.png'
import logo from '../asset/o.jpg';

class NavWithAuth extends Component {
    state = {
        show:false,
        val:"",
        quest:[]
    }
    componentDidMount(){
        this.props.getUserName()
        this.props.getExtraDta()
        this.props.getPosts();
       document.addEventListener('click',this.closeSearch)
       
      
      }
      closeSearch = ()=>{
          this.setState({
              show:false
          })
      }
     logout = () => {

        auth.signOut().then(() => {
          this.props.FaceBookLogin( null,this.props.history.push('/'))
          
        })
      }
      showPost = (uid,qid)=>{
        this.props.history.push(`/Home/Post/${uid}/${qid}`)
        }
      
      keyDownHandler = ()=>{
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
  
        const matchPosts = posts.filter(p=>p.questions.questionBody.body.toLowerCase().indexOf(this.state.val)!==-1)
        
        
        this.setState({
            show:true,
            quest:matchPosts
        })
        

      }
  render() {
    
      let img = userImg;
      if(this.props.authUser.userInformation ){
         img =this.props.authUser.userInformation.imageUrl.downloadURL ;
      }else if(this.props.authUser.user.photoURL && !this.props.authUser.userInformation){
          img = this.props.authUser.user.photoURL
      }
 
    return (
      <React.Fragment>
         
      <nav className="navbar navbar-expand-lg shadow  navbar-light ">
      <div className='container'>
             <div className="navbar-brand" style={{width:"110px",height:"100%"}}>
                 <img src={logo} alt="" className="img-fluid"/>
             </div>
             <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                 aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="collapsibleNavId">
                 <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                 <li className="nav-item my-2 mr-5">
                   {this.props.location.pathname.search('Post')===-1?
                   <input 
                    onChange={(e)=>{this.setState({val:e.target.value})}}
                    onKeyDown={this.keyDownHandler}
                     class=" mr-sm-2" type="search" 
                     placeholder="Search" 
                     aria-label="Search"/>:null
                   }  
                  
                     
                 </li>
                
                     <li className="nav-item ">
                         <Link className="nav-link my-2" to='/Home'>Home</Link>
                     </li>
                   
                     <li className="nav-item">
                         <Link className='nav-link my-1' to='/profile'>
                           <div class='profile'>
                              <img src={img} alt=""/>
                           </div>
                         </Link>
                        
                     </li>
                     <li className="nav-item my-3 dropdown">
                          <p className=' dropdown-toggle' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {this.props.authUser.username}
                            
                         </p>
                         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                           
                          <a class="dropdown-item" onClick={this.logout}>log out</a>
         
         
                           </div>
                         </li>
                   
                         
                    
                 </ul>
                
             </div>
         </div>
         </nav>
            <div className="search-box p-2 shadow " style={{display:this.state.show?'block':'none'}} ref='search'>
               {this.state.quest.map(p=>{
                   return(
                       <p onClick={(uid,qid)=>{this.showPost(p.userid,p.questions.questId)} }>
                           {p.questions.questionBody.body}
                       </p>
                           )
               })}
              </div>
    </React.Fragment>
     
    )
  }
}
const mapStateToProps = (state)=>{
     return {
         authUser:state.auth
     }
}
export default connect(mapStateToProps,actions)(withRouter(NavWithAuth)) 