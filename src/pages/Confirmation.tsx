import { CognitoUser } from "amazon-cognito-identity-js";
import { ChangeEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import UserPool from "../user-pool";
import "../App.css";

function Confirmation() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const { state } = useLocation();

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setCode(value);
  };
  const handleSubmit = () => {
    const user = new CognitoUser({
      Username: state || "",
      Pool: UserPool,
    });
    user.confirmRegistration(code, false, (error, result) => {
      if (error && !result) alert(error);
      else {
        alert("Account has been verified successfully.");
        navigate("../home", { replace: true });
      }
    });
  };
  return (
    <div className="App">
      <h1>Enter the verification code</h1>
      {localStorage.getItem("token") && <Navigate to="/home" replace={true} />}
      <input
        name="code"
        placeholder="Verification Code"
        value={code}
        type="text"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Verify</button>
    </div>
  );
}

export default Confirmation;
