import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { CartContext } from "../CartContext";


const SignUp = () => {
  const cartSignupUserData = useContext(CartContext)
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const handleEmailOnChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (!validateEmail(value) ) {
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
    if (!validatePassword(newPassword) ) {
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const validatePassword = (inputPassword) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    return passwordPattern.test(inputPassword);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
    setCheckboxError("");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let hasError = false; // Track if any validation errors exist

    if (!firstName) {
      setFirstNameError("First Name is required");
      hasError = true;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Lats Name is required");
      hasError = true;
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Email is not valid");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (!isChecked) {
      setCheckboxError("Please agre to the term and condition");
      hasError = true;
    }
    
    if (!hasError) {
        try {
            const registerObj = {
                firstName,lastName,email,password
            }
            const response = await fetch('https://reqres.in/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(registerObj),
            });
    
            if (response.ok) {
              const data = await response.json();
              localStorage.setItem("userObj", JSON.stringify(registerObj))
              toast.success("User Registered successfully")
              cartSignupUserData.singUp(registerObj)
              setTimeout(()=>{
                navigate("/login");    
              },3000)
       
            } else {
              toast.warn("Registration failed.")
            }
          } catch (error) {
            toast.warn("Error during registration")
          }
      
      }
   
   
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="FormContainer">
        <div className="formwrapper">
          <header className="login">Register</header>
          <p>
            If you have an account? <Link to="/login">Login</Link>{" "}
          </p>
          <form>
            <div className="form-group mb-2">
              <label for="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                aria-describedby="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              {firstNameError && (
                <p style={{ color: "red" }}>{firstNameError}</p>
              )}
            </div>
            <div className="form-group mb-2">
              <label for="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                aria-describedby="First Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
              {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
            </div>
            <div className="form-group mb-2">
              <label for="exampleInputEmail1">Username</label>
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
              <label for="exampleInputPassword1" className="">Password</label>
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
            <div className="form-group form-check mb-2">
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
              Register
            </button>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
