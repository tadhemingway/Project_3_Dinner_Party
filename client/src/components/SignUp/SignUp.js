import React, { useState, useContext } from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import "./style.css";
import API from "../../utils/API";
import {UserContext} from "../../utils/UserContext";
import { UserIdContext } from "../../utils/UserIdContext";


export default function SignUp() {
// functionality here
  const {globalUserName, setGlobalUserName} = useContext(UserContext);
  const {globalUserId, setGlobalUserId} = useContext(UserIdContext);

  const [passWord, setPassWord] = useState("");
  const [next, setNext] = useState(false)

    function validateForm() {
      if (globalUserName.length > 6 &&
          passWord.length > 6 &&
          next === false)
          {return true};
    } 

    function handleSubmit(event) {
      event.preventDefault();
    };

    function createGlobalUserData(res) {
      setGlobalUserId(res.data.id);
      setGlobalUserName(res.data.username);
      setNext(true)
    }

    function createUser() {

      API.postUser({
        username: globalUserName,
        password: passWord
      })
      .then(res => {
        createGlobalUserData(res);
      });
    };

    return (
      <>
        <div className="container middle">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card border-dark">
              <div className="card-header text-center">Create Account</div>
              <form className="card-body text-dark" onSubmit={ handleSubmit } >
                <div className="form-group">
                  <label htmlFor="username" className="form-row">Username (6 or more characters)</label>
                  <input type="text" className="form-control form-row" placeholder="" onChange={e => setGlobalUserName(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-row">Password (6 or more characters)</label>
                  <input type="password" autoComplete="new-password" className="form-control form-row" placeholder="" />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-row">Confirm Password</label>
                  <input type="password" className="form-control form-row" placeholder="" onChange={e => setPassWord(e.target.value)}/>
                </div>
                <div className="form-row justify-content-center" >
                  {(!next && <button type="submit" disabled={!validateForm()} className="btn btn-primary" onClick={ () => createUser() } >Sign Up</button>)}
                  {(next && <Link  to="/events" role="button" type="submit" className="btn btn-success"  >Enter Dinner Party</Link>)} 
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </>
    )

}