import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class footer extends Component {
    render(){
        return(
 <footer className='py-3'>
     <div className="container">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">copy right 2018</div>
            <div className="col-md-4">
            <a href="https://www.linkedin.com/in/benmazouz-seif-eddine-721112141/"target='_blank'> <FontAwesomeIcon icon={['fab','linkedin-in']}className='mr-2' color='lightgrey'/></a>
            <a href="https://web.facebook.com/profile.php?id=100004879302174&ref=bookmarks" target='_blank'> <FontAwesomeIcon icon={['fab','facebook-f']}className='mr-2' color='lightgrey'/></a>
            <a href="https://github.com/seif1000" target='_blank'> <FontAwesomeIcon icon={['fab','github']}className='mr-2' color='lightgrey'/></a>
            </div>
        </div>
     </div>
    </footer>

        )
    }

}
   
export default footer;
