import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../axios/index.js";

function AuthScreen() {
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();

  const [signUpInfo, setSignUpInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="py-5 mb-5">
      {login ? (
        <div>
          <div className="text-center mb-4">
            <h1>Sign In Form</h1>
          </div>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-11 col-md-8 col-lg-6 col-xl-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    loginUser(signInInfo)
                      .then((res) => {
                        localStorage.setItem(
                          "userAccess",
                          JSON.stringify(res.data)
                        );
                        navigate("/");
                      })
                      .catch((err) => console.log(err.message));
                  }}
                >
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="E-mail"
                      value={signInInfo.email}
                      onChange={(e) =>
                        setSignInInfo({
                          ...signInInfo,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword"
                      placeholder="Password"
                      value={signInInfo.password}
                      onChange={(e) =>
                        setSignInInfo({
                          ...signInInfo,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button
                    className="btn btn-link"
                    onClick={() => setLogin(false)}
                  >
                    I don't have an account, damn it!
                  </button>{" "}
                  <br />
                  <button
                    type="submit"
                    className="btn btn-outline-success mt-3"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center mb-4">
            <h1>Sign Up Form</h1>
          </div>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-11 col-md-8 col-lg-6 col-xl-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createUser(signUpInfo)
                      .then((res) => {
                        localStorage.setItem(
                          "userAccess",
                          JSON.stringify(res.data)
                        );
                        alert("User added successfully");
                        navigate("/");
                      })
                      .catch((err) => console.log(err.message));
                  }}
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputFirstName"
                      placeholder="First Name"
                      value={signUpInfo.firstName}
                      onChange={(e) =>
                        setSignUpInfo({
                          ...signUpInfo,
                          firstName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputLastName"
                      placeholder="Last Name"
                      value={signUpInfo.lastName}
                      onChange={(e) =>
                        setSignUpInfo({
                          ...signUpInfo,
                          lastName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="E-mail"
                      value={signUpInfo.email}
                      onChange={(e) =>
                        setSignUpInfo({
                          ...signUpInfo,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword"
                      placeholder="Password"
                      value={signUpInfo.password}
                      onChange={(e) =>
                        setSignUpInfo({
                          ...signUpInfo,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputConfirmPassword"
                      placeholder="Confirm Password"
                      value={signUpInfo.confirmPassword}
                      onChange={(e) =>
                        setSignUpInfo({
                          ...signUpInfo,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <p className="text-danger fs-6">
                    {signUpInfo.password !== signUpInfo.confirmPassword &&
                      "Passwords do not match!"}
                  </p>
                  <button
                    className="btn btn-link"
                    onClick={() => setLogin(true)}
                  >
                    I already have an account bitch!
                  </button>{" "}
                  <br />
                  <button
                    type="submit"
                    className="btn btn-outline-success mt-3"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthScreen;
