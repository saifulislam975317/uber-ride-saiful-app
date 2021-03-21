import React, { useContext, useState } from 'react';
import './CreateAccount.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



function CreateAccount() {
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  const [setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/whereTo" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName,email, photoURL}=res.user;
      const signedInUser ={name: displayName, email}
      setLoggedInUser(signedInUser)
      history.replace(from);
      const isSignedIn ={
        isSignedIn: true,
        name: displayName,
        email: email,
        
        photo: photoURL
      }
      setUser(isSignedIn);
      console.log(displayName, email, photoURL)
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  }

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res =>{
      const signedOutUser = {
        isSignedIn: false,
       
        name: '',
        photo: '',
        email: '',
        error: '',
        success: false
      }
      setUser(signedOutUser);
    })
    .catch(error =>{

    })

  }
  const handleBlur = (event) =>{

    let isFormValid=true
    if(event.target.name==='email' ){
      isFormValid= /\S+@\S+\.\S+/.test(event.target.value)
     
    }if(event.target.name==='password'){
      const isPasswordValid=event.target.value.length>=8;
      isFormValid=isPasswordValid
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }

    
  }
  const handleSubmit = (event) =>{
    if(newUser && user.email && user.password){
    
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo ={...user};
        newUserInfo.error = '';
        newUserInfo.success=true;
        setUser(newUserInfo);
        updateUserName(user.name);
       
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error=error.message
        newUserInfo.success=false;
      setUser(newUserInfo)
       
      })};

      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo ={...user};
          newUserInfo.error = '';
          newUserInfo.success=true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
          history.replace(from);
          console.log('sign in user info', res.user)
        })
  .catch(function (error) {
    const newUserInfo = {...user};
    newUserInfo.error=error.message
    newUserInfo.success=false;
  setUser(newUserInfo)
  });
      

 
}

    event.preventDefault();
  }

     const updateUserName = name =>{
         var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
       
      }).then(function() {
        console.log('user name updated successfully')
        }).catch(function(error) {
        console.log(error)
        });
  }

  return (
    <div style={{textAlign:'center'}}>
    
      <br/>

    {
      user.isSignedIn && <div>
        <p>Welcome, {user.name}</p>
        <p>Your email: {user.email}</p>
        <img src={user.photo} alt=""/>
      </div>
    }

    <div className="signIn-signUp-form">
      <h1>Sign In & Sign Up Form</h1>
     <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New user sign up</label>
        <br/>
       { newUser && <input type="text" name="name" placeholder='your name' onBlur={handleBlur}/>}
        <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your email" required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required/>
      <br/>
      <input type="submit" value={newUser ? 'sign up' : 'sign In'}/>
      </form>
     
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User {newUser ? 'created': 'logged In'} successfully</p>}
      
      <p style={{color:'white'}}>or</p>
     
      <br/>
      {
      user.isSignedIn ?<button onClick={handleSignOut}>Sign out</button>:
     
      <button className="google-button" onClick={handleSignIn}>continue with Google</button>
      }
    </div>
    </div>

    
  );
}


export default CreateAccount;
