import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './NavBar.css'

const NavBar = () => {
    const [loggedInUser] =useContext(UserContext)
    return (
        <div className="nav-bar">
        <nav>
        <a href="/home">Home</a>
        <a href="/destination">Destination</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
        <a href="/login">Login</a>
        <p className="title">{loggedInUser.name}</p>
       
        </nav>
        <h1>{loggedInUser.email}</h1>
        <h1 className="riders">Pathao Riders</h1>
    </div>
    );
};

export default NavBar;