import { useEffect, useMemo, useState } from "react";

import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [confirmError, setConfirmError] = useState({});

  const [alreadyFeched, setAlreadyFeched] = useState(false);

  const submitDisabled = useMemo(() => {
    if (email === "") return true;
    if (username === "") return true;
    if (firstName === "") return true;
    if (lastName === "") return true;
    if (password === "") return true;
    if (passwordConfirm === "") return true;
    if (confirmError.type) return true;

    return false;
  }, [
    email,
    username,
    firstName,
    lastName,
    password,
    passwordConfirm,
    confirmError,
  ]);

  const sendUserData = () => {
    if (!alreadyFeched) {
      setAlreadyFeched(true);
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          name: firstName + " " + lastName,
          password: password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          localStorage.setItem("session", response.token);
          // location.href = "/";
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    let form = document.querySelector("#SignUp");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // sendUserData();
    });
  }, []);

  useEffect(() => {
    const emailValid = document.getElementById("Email").validity.valid;
    const usernameValid = document.getElementById("Username").validity.valid;
    const passwordValid = document.getElementById("Password").validity.valid;

    if (password !== passwordConfirm) {
      setConfirmError({ type: "confirmPassword" });
    } else if (!emailValid) {
      setConfirmError({ type: "email" });
    } else if (!usernameValid) {
      setConfirmError({ type: "username" });
    } else if (!passwordValid) {
      setConfirmError({ type: "password" });
    } else {
      setConfirmError({});
    }
  }, [password, passwordConfirm, email, username]);

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form onSubmit={sendUserData} id="SignUp">
        <div>
          <div>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              id="Email"
              name="email"
              placeholder="Email address"
            />
          </div>
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
            <div>
              <input
                required
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="form-control"
                id="FirstName"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div>
              <input
                required
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="form-control"
                id="LastName"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
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
          <div>
            <input
              required
              type="password"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              className="form-control"
              id="ConfirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              aria-describedby="HelpConfirmPassword"
            />
            {confirmError.type && confirmError.type === "confirmPassword" && (
              <div id="HelpConfirmPassword" className="form-text">
                Your password does not match...
              </div>
            )}
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

export default SignUp;
