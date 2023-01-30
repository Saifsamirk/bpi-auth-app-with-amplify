import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { ChangeEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserPool from "../user-pool";
import "../App.css";

interface RegisterFormProps {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: "Male" | "Female";
  birthdate: string;
  phone_number: string;
}

const formItems: RegisterFormProps = {
  name: "",
  username: "",
  email: "",
  password: "",
  gender: "Male",
  birthdate: "",
  phone_number: "",
};

enum Mapping {
  name = "text",
  username = "text",
  email = "text",
  password = "password",
  birthdate = "date",
  gender = "text",
  phone_number = "text",
}

function Register() {
  const [form, setForm] = useState({
    ...formItems,
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
    let attributeList = [
      new CognitoUserAttribute({
        Name: "name",
        Value: form.name,
      }),
      new CognitoUserAttribute({
        Name: "email",
        Value: form.email,
      }),
      new CognitoUserAttribute({
        Name: "birthdate",
        Value: form.birthdate,
      }),
      new CognitoUserAttribute({
        Name: "gender",
        Value: form.gender,
      }),
      new CognitoUserAttribute({
        Name: "phone_number",
        Value: `+${form.phone_number}`,
      }),
    ];
    UserPool.signUp(
      form.username,
      form.password,
      attributeList,
      [],
      (error, data) => {
        if (error) console.error(error);
        else {
          alert("Your account has been created successfully");
          navigate("../verify", { replace: true, state: form.username });
          console.log({ data });
        }
      }
    );
  };
  return (
    <div className="App">
      <h1>Create a new account</h1>
      {localStorage.getItem("token") && <Navigate to="/home" replace={true} />}
      {Object.entries(formItems).map(([name]) => (
        <input
          key={name}
          name={name}
          value={form[name as keyof RegisterFormProps]}
          type={Mapping[name as keyof RegisterFormProps]}
          onChange={handleChange}
          placeholder={name.replace(/\_/g, " ")}
        />
      ))}
      <button onClick={handleSubmit}>Register</button>
      <Link to="/">Already a member?</Link>
    </div>
  );
}

export default Register;
