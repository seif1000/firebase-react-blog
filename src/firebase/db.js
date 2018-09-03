import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  
  });
  export const addDataUser = (id,firstName,lastName,job,imageUrl)=>{
    db.ref(`usersInfo/${id}`).set({
        firstName,
        lastName,
        job,
        imageUrl
    })
  }
  export const addPosts= (id,username,body,userImage,createdAt)=>{
    db.ref(`posts/${id}`).push().set({
        username,
        body,
        userImage,
        createdAt

       
    })
  }

  export const addresponse= (qid,uid,body,username,img)=>{
    db.ref(`responses/${qid}/${uid}`).push().set({
       body,
      username,
      img
       
    })
  }

