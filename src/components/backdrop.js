import React,{Component} from 'react';
import Progress from 'react-progressbar';
import {connect} from 'react-redux';
 class BackDrop extends Component{
     render(){
         let prog = 0;
        if(this.props.authUser.downUrl){
           prog= this.props.authUser.downUrl.progress
        }
        return (
            <div
             className="Black" 
             style={{
                 display:this.props.show ?"block":"none"
             }}>
               <div style={{width:"40%",margin:" 100px auto"}}>
                   <p>upLoding...</p>
                  <Progress completed={prog} color='red' /> 
               </div>
                 
             
        
           
              
            </div>
        )
     }
 } 
 const mapStateToProps = (state)=>{
    return{
        authUser:state.auth
    }
}
export default connect(mapStateToProps)(BackDrop);