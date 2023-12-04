import axios from "axios";
import { useState } from "react";

const Header = (props)=>{
  let [newUser, setNewUser] = useState({
    name: "",
    mobile: "",
    Email: "",
    adress: "",
    password : "",
  });
  let [login, setLogin] = useState({
    Email: "",
    password: "",
  });
 
  let saveNewUser= async() =>{
    try {
      let url = `http://localhost:3030/api/create-user-account`;
     let {data} = await axios.post(url, { ...newUser });
    alert(data.message);
    if(data.status === true){
      window.location.assign("/");
        }
    } catch (error) {
alert("server error");
    }
    
  };
  
  
  let  userLogin = async()=>{
    try {
      let url = `http://localhost:3030/api/user-login`;
     let {data} = await axios.post(url, { ...login });
    alert(data.message);
    console.log(data);
    if(data.status === true){
     // window.location.assign("/");
        }
    } catch (error) {
      //console.log(error);
alert("server error");
    }
  };
      return (
      <>
        <div
          className="modal fade"
          id="modalUserNewAccount"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel2">
                  Create A new Account
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter full Name"
                    value={newUser.name}
                    onChange={(event) => {
                      setNewUser({...newUser, name: event.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter mobile"
                    value={newUser.mobile}
                    onChange={(event) => {
                      setNewUser({ ...newUser, mobile: event.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="Email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    value={newUser.Email}
                    onChange={(event) => {
                      setNewUser({ ...newUser, Email: event.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={newUser.adress}
                    onChange={(event) => {
                      setNewUser({ ...newUser, adress: event.target.value });
                    }}
                  ></textarea>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="enter password"
                      value={newUser.password}
                      onChange={(event) => {
                        setNewUser({
                          ...newUser,
                          password: event.target.value
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={saveNewUser} className="btn btn-success">Create Accont</button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="modalUserLogin"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel2">
                  Login
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="loginEmail"
                    placeholder="Enter Email"
                    value={login.Email}
                    onChange={(event) => {
                      setLogin({...login, Email: event.target.value});
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="login-password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    placeholder="enter password"
                    value={login.password || ""}
                    onChange={(event) => {
                      setLogin({...login, password: event.target.value});
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={userLogin} className="btn btn-success">
                Login
              </button>
            </div>
          </div>
        </div>
        <header className="first-part">
          <span className="logo">
            <a href="./index.html" className="logo-text">
              e!
            </a>
          </span>
          <span className="first-right">
            <a
              href="#"
              className="login"
              data-bs-toggle="modal"
              data-bs-target="#modalUserLogin"
            >
              login
            </a>
            <a
              href="#"
              className="account"
              data-bs-toggle="modal"
              data-bs-target="#modalUserNewAccount"
            >
              create an account
            </a>
          </span>
        </header>
      </>
    );
};

export default Header;