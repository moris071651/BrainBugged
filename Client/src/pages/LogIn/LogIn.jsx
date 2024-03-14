import { useEffect, useMemo, useState } from "react";

import "./LogIn.css";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmError, setConfirmError] = useState({});

  const submitDisabled = useMemo(() => {
    if (username === "") return true;
    if (password === "") return true;
    if (confirmError.type) return true;

    return false;
  }, [
    username,
    password,
    confirmError,
  ]);

  const sendUserData = () => {
    const formData = new FormData();

    formData.append('Username', username)
    formData.append('Password', password)

    fetch("/api/login", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        localStorage.setItem("session", response.token);
        location.href = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    let form = document.querySelector("#LogIn");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendUserData();
    });
  }, []);

  useEffect(() => {
    const usernameValid = document.getElementById("Username").validity.valid;
    const passwordValid = document.getElementById("Password").validity.valid;

    if (!usernameValid) {
      setConfirmError({ type: "username" });
    } else if (!passwordValid) {
      setConfirmError({ type: "password" });
    } else {
      setConfirmError({});
    }
  }, [password, username]);

  return (
    <div className="SignUp">
      <h1>Log In</h1>
      <form id="LogIn">
        <div>
          <div>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="form-control"
              id="Username"
              name="username"
              placeholder="Username"
              pattern="^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
            />
          </div>
          <div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              id="Password"
              name="password"
              placeholder="Password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$"
            />
          </div>
        </div>
        <div>
          <button
            disabled={submitDisabled}
            type="submit"
            className="btn btn-primary"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
