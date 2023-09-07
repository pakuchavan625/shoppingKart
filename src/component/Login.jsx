import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../CartContext";



const Login = () => {
  const cartDetail = useContext(CartContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
    }

    if (!password) {
      setPasswordError("Password is required");
    }

    if (!isChecked) {
      setCheckboxError("Please agre to the term and condition");
    }

      if (email && password && isChecked) {
        try {
            const loginObj = {
               email,password
            }
            const response = await fetch('https://reqres.in/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginObj),
            });
    
            if (response.ok) {
              toast.success("User logged in successfully!");
              localStorage.setItem("isLoggedIn", "true");
              cartDetail.login(loginObj)
              setTimeout(()=>{
                // Here navigating to the next page along the passing the data object also
                  navigate("/home",  { state:loginObj})
              },2000)

            } else {
              toast.warn("User is not  Registered!")
            }
          } catch (error) {
            toast.warn('something went wrong:');
          }
      
      }
      
    
  };

  const handleEmailOnChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const validateEmail = (inputEmail) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(inputEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('')
 
  };

  // const validatePassword = (inputPassword) => {
  //   const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  //   return passwordPattern.test(inputPassword);
  // };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
    setCheckboxError("");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="FormContainer">
        <div className="formwrapper">
          <header className="login">Login</header>
          <p>
            Doesn't have account yet? <Link to="/register">Register</Link>{" "}
          </p>
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={handleEmailOnChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span className="password-toggle-icon">
                  <span onClick={handleTogglePasswordVisibility}>
                    {showPassword ? (
                      <i className="bi bi-eye-fill"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </span>
                </span>
              </div>
            </div>

            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" for="exampleCheck1">
                Agree
              </label>
              {checkboxError && <p style={{ color: "red" }}>{checkboxError}</p>}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Login
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
