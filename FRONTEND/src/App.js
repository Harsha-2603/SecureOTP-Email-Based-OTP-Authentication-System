import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSendOtp =async () => {
    const sendotp = await fetch("http://127.0.0.1:5000/otpchecker/send-otp",{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
    })
    const data=await sendotp.json();
    console.log(data);
  };
  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    const response = await fetch("http://127.0.0.1:5000/otpchecker/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: enteredOtp,
        }),
    });

    const data = await response.json();

    if (data.success) {
      navigate("/success");
    } else {
      navigate("/failure");
    }
  };
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="App">
      <div className="d-flex justify-content-center align-items-center vh-100 bg-info w-100">
        <Card style={{  height:'30rem',width: '40rem' }}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">enter your gmail id</InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <Button onClick={handleSendOtp}>
                Send OTP
              </Button>
              <div className="otp-container">
                {otp.map((digit, index) => (
                  <Form.Control
                    key={index}
                    type="text"
                    value={digit}
                    maxLength={1}
                    ref={(element) => (inputRefs.current[index] = element)}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-input"
                  />
                ))}
              </div>
              <Button onClick={handleVerify}>
                Verify OTP
              </Button> 
              
            </Card.Body>
        </Card>
      </div>
    </div>  
  );
}

export default App;
