import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../CartContext";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";

const Login = () => {
  const location = useLocation();
  const { login, translate } = useContext(CartContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (location.state !== null) {
      setEmail(location.state.password);
      setPassword(location.state.password);
      handleSubmit();
    }
  }, []);

  const handleSubmit = async (e) => {
    if (email && password && isChecked){
      setIsLoading(true);
      setIsSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsSuccess(true);
        }, 3000);
      }, 3000); 
    }
  
    if (location.state !== null) {
      try {
        const loginObj = {
          email: location.state.email,
          password: location.state.password,
        };
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginObj),
        });

        if (response.ok) {
          toast.success("User logged in successfully!");
          localStorage.setItem("isLoggedIn", "true");
          login(loginObj);
          navigate("/", { state: location.state.firstName });
          setIsLoading(false);
          // setTimeout(()=>{
          //   // Here navigating to the next page along the passing the data object also

          // },2000)
        } else {
          toast.warn("User is not  Registered!");
          setIsLoading(false);
        }
      } catch (error) {
        toast.warn("something went wrong:");
        setIsLoading(false);
      }
    } else {
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
            email,
            password,
          };
          const response = await fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginObj),
          });

          if (response.ok) {
            toast.success("User logged in successfully!");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loginData", loginObj);
            login(loginObj);
            setTimeout(() => {
              // Here navigating to the next page along the passing the data object also
              navigate("/");
              setIsLoading(false);
              setIsSuccess(false)
            }, 3000);
          } else {
            toast.warn("User is not  Registered!");
            setIsLoading(false);
          }
        } catch (error) {
          toast.warn("something went wrong:");
          setIsLoading(false);
          setIsSuccess(false)
        }
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
    setPasswordError("");
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
          <header className="login">{translate("login")}</header>
          <p style={{ textAlign: "center" }}>
            {translate("registerdOrNot")}?{" "}
            <Link to="/register">{translate("register")}</Link>{" "}
          </p>
          <form>
            <div className="form-group mb-2">
              <label for="exampleInputEmail1">{translate("emailAddres")}</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={handleEmailOnChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                {translate("emailWeDontSHare")}
              </small>
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </div>
            <div className="form-group mb-2">
              <label for="exampleInputPassword1" className="password">
                {translate("password")}
              </label>
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
                {translate("agree")}
              </label>
              {checkboxError && <p style={{ color: "red" }}>{checkboxError}</p>}
            </div>
            <Button
              type="submit"
              className="btn btn-primary "
              onClick={handleSubmit}
              disabled={isLoading} // Disable the button while loading
              style={{ width: "100%" }}
            >
              {isLoading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
              ) :isSuccess ? (
                // Display the success icon
                <div className="success" style={{color:'white'}}>
                 <span className="bi bi-check-circle"></span>
                </div>
              ) : (
                translate("loginButton")
              )}
            </Button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
