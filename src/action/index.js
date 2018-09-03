import {
    FACEBOOK_LOGIN ,
    GET_USERNAME,
    GET_IMAGE,
    GET_EXTRA ,
    GET_POSTS,
    GET_QUEST_DETAI,
    GET_RESPONSE,
  
} from './type';

import  {auth,db,stor} from "../firebase/firebase";



export const FaceBookLogin = (authUser,callback)=>{
    return{
        type: FACEBOOK_LOGIN,
        payload:authUser
    }
    callback()
}
export const getImage = (image,fileBlob)=>{
    const uploadTask = stor.ref(`/images/${auth.currentUser.uid}/${image}`).put(fileBlob);
    let progress;
    return dispatch=>{
        uploadTask.on('state_changed', (snapshot) => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
        }, (error) => {console.log(error);},function() {
       
            uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
             
                dispatch({
                    type:GET_IMAGE,
                    payload:{downloadURL,progress}
                })
            });
     })
    }
  
  
 
}


export const getUserName = ()=>{
  const userId = auth.currentUser.uid; 
  const request =  db.ref('/users/' + userId).once('value');

  return (dispatch)=>{
      request.then(snapshot=> {
       dispatch (
               { type:GET_USERNAME,
                 payload:( snapshot.val() && snapshot.val().username) || 'Anonymous'
                }
                )
        
     });
  }

   
  
}

export const getExtraDta= ()=>{
   const  userId = auth.currentUser.uid;
    const request =  db.ref('/usersInfo/' + userId).once('value');
  
    return (dispatch)=>{
        request.then(snapshot=> {
         dispatch (
                 { type:GET_EXTRA ,
                   payload:( snapshot.val()&& snapshot.val() )
                  }
                  )
          
       });
    }
}
    export const getPosts= ()=>{
       
        const request =  db.ref('/posts/' ).once('value');
      
        return (dispatch)=>{
            request.then(snapshot=> {
             dispatch (
                     { type:GET_POSTS ,
                       payload:( snapshot.val() )
                      }
                      )
              
           });
        }
     
    
  
    }

  export const getQuestionDetails = (uid,qid)=>{
    const request =  db.ref(`posts/${uid}`).once('value');
    return (dispatch) =>{
        request.then(snapshot=>{
            dispatch({
                type:GET_QUEST_DETAI,
                payload:(snapshot.val()[qid])
            })
        })
    }

  }
  export const getAnswers= (qid)=>{
       
    const request =  db.ref(`responses/${qid}` ).once('value');
  
    return (dispatch)=>{
        request.then(snapshot=> {
         dispatch (
                 { type:GET_RESPONSE ,
                   payload:( snapshot.val() )
                  }
                  )
          
       });
    }
 


}
















  
 
 