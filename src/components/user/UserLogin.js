import {ToastContainer} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";

const UserLogin = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(user_params => ({...user_params, [name]: value}))
  }

  const handleSubmit = async (event) => {
    // TODO
    // get AccountID from backend
  }

  return (
    <div>
      <br />
      <h1 className={"reg-font"}> Restaurants </h1>
      <h2 className={"reg-font"}> Log In </h2>
      <br />
      <form onSubmit={handleSubmit} method="post" className = "log-form">
        <label className="log-label">
          Email Address
        </label>
        <input className="log-input" type="email" id = "email" name = "email"  required value={user.email} onChange={handleChange} />

        <br />

        <label className="log-label">
          Password
        </label>
        <input className="log-input"  type="password" id = "password" name = "password"  required value={user.password} autoComplete="true" onChange={handleChange} />

        <br />
        <br />

        <div className="container-log-btn">
          <button type="submit" name = "btn_submit" className="log-form-btn">
            <span>LOGIN</span>
          </button>
        </div>
        <br />

        <ToastContainer />
      </form>

      <br/><br/>
      <p className={"sign-in-font"}> New user? <Link className='sign-in-link' to="/user/register"> Register </Link> </p>

    </div>
  )
}

export default UserLogin