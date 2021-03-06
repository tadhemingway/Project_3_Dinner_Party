import React, {useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Footer from "../../components/Footer/Footer"
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";

const styles = {
  keepIt: {
    maxWidth: '100%',
    maxHeight: '100%',
    paddingLeft: 0,
    paddingRight: 0,
  },
  buttonSpacer: {
    marginTop: 20,
    marginBottom: 20
  }
}

export default function Landing() {

  const history = useHistory();
  function handleBackButton() {
    window.onpopstate = () => {
      history.go(1);
    }
  }

  useEffect(()=>{
    localStorage.removeItem("globalUserName");
    localStorage.removeItem("globalUserId");
    handleBackButton();
  },[]);

  const [signUp, setSignUp] = useState(false);
  
    return (
        <div className="container" style={styles.keepIt}>
          <Jumbotron />
          {(!signUp && <div className="row justify-content-center">
            <button className="btn btn-outline-secondary btn-sm" style={styles.buttonSpacer} onClick={e => setSignUp(true)}>Sign up for a new account here.</button>
          </div>) || <div className="row justify-content-center">
            <button className="btn btn-outline-secondary btn-sm" style={styles.buttonSpacer} onClick={e => setSignUp(false)}>Sign into your new account here.</button>
          </div>}
          {(signUp && <SignUp />) || <SignIn />}
          <Footer />
        </div>
    )
}