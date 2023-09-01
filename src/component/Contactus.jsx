import React, { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Contactus = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [messageError, setMessageerror] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneNumber = (e) => {
    const newNumber = e.target.value;
    setPhoneNumber(newNumber);

    if (!validatePhoneNumber(newNumber)) {
      setPhoneNoError("Enter valid Phone number");
    } else {
      setPhoneNoError("");
    }
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
    setMessageerror("");
  };

  const handleSend = async (e) => {
    e.preventDefault();

    let hasError = false;
    if (!firstName) {
      setFirstNameError("Firstname is required");
      hasError = true;
    }

    if (!lastName) {
      setLastNameError("Lastname is required");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (!phone) {
      setPhoneNoError("Phone numeber is required");
      hasError = true;
    }

    if (!message) {
      setMessageerror("Message is required");
      hasError = true;
    }

    if (!hasError) {
      const serviceId = "service_ys07qic";
      const templateId = "template_0e6lscj";
      const userId = "_RP3Ru2IlZkLFKUXE";

      const templateParams = {
        from_name: firstName,
        from_email: email,
        message: message,
      };
      try {
        const response = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          userId
        );
        
        if (response.status === 200) {
          toast.success("Message sent successfully!");
          setTimeout(()=>{
            navigate("/feedback");
          },3000)
          
        }
      } catch (error) {
        toast("Somethingwent wrong");
      }
    }
  };

  const validateEmail = (inputEmail) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(inputEmail);
  };

  const validatePhoneNumber = (number) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(number);
  };

  return (
    <>
      <form>
        <div className="form-group mb-2">
          <label for="firstname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            aria-describedby="First Name"
            style={{width:"300px"}}
            value={firstName}
            onChange={handleFirstName}
          />
        </div>
        {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
        <div className="form-group mb-2">
          <label for="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            aria-describedby="First Name"
            style={{width:"300px"}}
            value={lastName}
            onChange={handleLastName}
          />
        </div>
        {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
        <div className="form-group mb-2">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            style={{width:"300px"}}
            value={email}
            onChange={handleEmail}
          />
        </div>
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <div className="form-group mb-2">
          <label for="exampleInputEmail1">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            aria-describedby="phonehelp"
            style={{width:"300px"}}
            value={phone}
            onChange={handlePhoneNumber}
          />
        </div>
        {phoneNoError && <p style={{ color: "red" }}>{phoneNoError}</p>}
        <div className="form-group mb-2">
          <label for="exampleInputEmail1">Message</label>
          <FloatingLabel>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px", width:'300px' }}
              value={message}
              onChange={handleMessage}
            />
          </FloatingLabel>
        </div>
        {messageError && <p style={{ color: "red" }}>{messageError}</p>}
        <Button type="submit" className="btn btn-primary" onClick={handleSend}>
          send
        </Button>
        <ToastContainer />
      </form>
    </>
  );
};

export default Contactus;
