import { Navigate, useNavigate } from "react-router-dom";
import UserPool from "../user-pool";
import "../App.css";
import { CognitoUser } from "amazon-cognito-identity-js";

function Home() {
  const navigate = useNavigate();
  var cognitoUser = UserPool.getCurrentUser();
  console.log({ cognitoUser });
  const handleLogout = () => {
    const user = new CognitoUser({
      Username: localStorage.getItem("username") || "",
      Pool: UserPool,
    });
    user.signOut(() => {
      localStorage.clear();
      navigate("/");
    });
  };
  return (
    <div className="App">
      {!localStorage.getItem("token") && <Navigate to="/" replace />}
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
