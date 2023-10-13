import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "../style/LoginForm.css";

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const handleLogin = () => {
    const expiration = Date.now() + 3600000;
    dispatch({
      type: "LOGIN",
      payload: {
        token: "dummyAuthToken",
        username: credentials.username,
        expiration,
      },
    });

    history.push(`/private`);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          <span>Username:</span>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          <span>Password:</span>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
