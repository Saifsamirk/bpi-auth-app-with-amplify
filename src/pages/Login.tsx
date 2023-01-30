import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { ChangeEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserPool from "../user-pool";
import "../App.css";

interface LoginFormProps {
  username: string;
  password: string;
}

function Login() {
  const [form, setForm] = useState<LoginFormProps>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const user = new CognitoUser({
      Username: form.username,
      Pool: UserPool,
      //   Storage: new CookieStorage({
      //     domain: "http://localhost:3000",
      //     secure: true,
      //   }),
    });
    const authenticationDetails = new AuthenticationDetails({
      Username: form.username,
      Password: form.password,
    });
    user.authenticateUser(authenticationDetails, {
      onSuccess: (data) => {
        console.log({ data });
        const token = data.getAccessToken().getJwtToken();
        const username = data.getAccessToken().payload.username;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        navigate("home");
      },
      onFailure: (error) => alert(error),
    });
  };
  return (
    <div className="App">
      <h1>Already a user?</h1>
      {localStorage.getItem("token") && <Navigate to="/home" replace={true} />}
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        type="text"
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="Password"
        value={form.password}
        type="password"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Login</button>
      <Link to="register">Not a member? Register a new account</Link>
    </div>
  );
}

export default Login;
