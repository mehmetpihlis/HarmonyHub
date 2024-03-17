import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logOut, refreshAccessToken } from "../axios/index";
import { jwtDecode } from "jwt-decode";

function Nav() {
  const navigate = useNavigate();

  const [userAccess, setUserAccess] = useState({
    user: "",
    accessToken: "",
  });

  useEffect(() => {
    if (localStorage.getItem("userAccess") && userAccess?.user === "") {
      setUserAccess(JSON.parse(localStorage.getItem("userAccess")));
    }

    const accessToken = userAccess?.accessToken;
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);

      refreshAccessToken(userAccess?.user?._id)
        .then((res) => {
          localStorage.setItem("userAccess", JSON.stringify({
            user: userAccess?.user,
            accessToken: res.data.accessToken
          }));
          setUserAccess(JSON.parse(localStorage.getItem("userAccess")));
        })
        .catch((err) => console.log(err));

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        // LogOut
        localStorage.removeItem("userAccess");
        logOut(userAccess?.user?._id)
          .then(() => console.log("Çıkış İşlemi Başarılı"))
          .catch((error) => console.log(error.message));
        setUserAccess({
          user: "",
          accessToken: "",
        });
      }
    }
  }, [navigate]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary py-4"
        data-bs-theme="dark"
      >
        <div className="container-fluid mx-5">
          <a className="navbar-brand fs-2" href="/">
            HarmonyHub
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              {userAccess.user === "" ? (
                <>
                  <NavLink className="nav-link" to="/auth">
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-link" to="/create">
                    Create
                  </NavLink>
                  <NavLink
                    className="nav-link text-danger"
                    to={"/auth"}
                    onClick={() => {
                      setUserAccess({
                        user: "",
                        accessToken: "",
                      });
                      localStorage.removeItem("userAccess");

                      logOut(userAccess?.user?._id)
                        .then(() => console.log("Çıkış İşlemi Başarılı"))
                        .catch((error) => console.log(error.message));

                    }}
                  >
                    Sign Out
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
