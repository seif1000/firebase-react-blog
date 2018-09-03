import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from  './components/home';
import Landing from './components/landing';
import Login from './components/Login';
import  './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSortDown,faEdit,faReply, faCommentAlt,faArrowRight} from '@fortawesome/free-solid-svg-icons';
import NewUserHome from './components/newUserHome';
import PostShow from './components/PostShow';
import Footer from './components/Footer';



library.add(fab,faSortDown,faEdit,faReply,faCommentAlt,faArrowRight);

export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
       
      
      
        <Switch>
        

           <Route path="/Home/Post/:uid/:qid" component={PostShow}/>
           <Route path='/Home' component={Home}/>  
           <Route path='/Login' component={Login}/>
           <Route path='/NewUser' component={NewUserHome}/>
           <Route path='/' component={Landing}/>

         
       
        </Switch>

         <Footer/>
      </div>
      </Router>
    
    )
  }
}
