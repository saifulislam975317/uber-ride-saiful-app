import React from 'react';
import { useHistory } from 'react-router';
import './Header.css'

const Header = (props) => {
    const history = useHistory()
    const handleLogIn = () =>{
        history.push('/createAccount')
    }
    const {type,image} =props.details;
    return (
        
        <div className="vehicle-container">
            
            <div onClick={handleLogIn}  className="vehicle-details">
            <img src={image} alt=""/>
            <h2>{type}</h2>
            </div>
           
        </div>
       
    );
};

export default Header;