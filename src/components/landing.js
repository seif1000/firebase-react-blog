import React from 'react';
import NavbarWithOutAuth from './navbarWithOutAuth';
import SignUpFacebook from './signUpFacebook';
import SignUpEmail from './signUpEmail';

const landing = () => {
  return (
    <div>
      <NavbarWithOutAuth/>
      <div id='showcase'>
      <div id='wel-form' className='shadow my-4'>
     
      <SignUpFacebook/>
      <SignUpEmail/>
       
    </div>
    </div>
    </div>
    
   
  )
}

export default landing;
