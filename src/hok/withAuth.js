import React ,{Component}from 'react';
import {connect} from  'react-redux';
import {auth} from '../firebase/firebase';


const withAuth =(WrapComponent) => {
   class WithAuth extends Component{

    componentDidMount() {
        auth.onAuthStateChanged(authUser => {
          if (!authUser) {
            this.props.history.push('/');
          }
        });
      }
        render(){
          
          return  this.props.userAuth.user?<WrapComponent/>:null
            
        }
   }

   const mapStateToProps = (state)=>{
       return{
           userAuth:state.auth
       }
   }
   return  connect(mapStateToProps)(WithAuth)
}


export default withAuth;
