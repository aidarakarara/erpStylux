import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "src/api/api";
import Page from "src/components/Page";
import { Table } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";

export default function PasswordUpdate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [newPassword_c, setNewPassword_c] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [passworNotConfirm, setPassworNotConfirm] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [msg, setMsg] = useState(null);
  const [msgError, setMsgError] = useState("");
  useEffect(() => {
    api.get("api/user").then((res) => {
      setUser(res.data);
    });
  }, []);

  /**
   * Tracage des changements des inputs pour le test si c'est egal ou pas
   */
  useEffect(() => {
    comparePassword();
  }, [newPassword, newPassword_c, oldPassword]);

  const comparePassword = () => {
    if (
      newPassword != newPassword_c ||
      newPassword.length < 4 ||
      newPassword == oldPassword
    ) {
      setPassworNotConfirm(true);
    } else {
      setPassworNotConfirm(false);
    }
  };
  function logoutAll() {
    api.get("sanctum/csrf-cookie").then((response) => {
      api.post("api/logout-all").then((res) => {
        localStorage.removeItem("user-token");
        navigate("/login");
      });
    });
  }
  function modifier(e) {
    e.preventDefault();
    var data = { password: newPassword, oldPassword: oldPassword };
    api.get("sanctum/csrf-cookie").then((response) => {
      api
        .post("api/users-update", data)
        .then((res) => {
          res.data == 1 ? logoutAll() : alert(res.data.error);
          //setMsgError(res.data.error);
        })
        .catch((err) => console.log(err));
    });
  }
  return (
    <Page title="Réglages" className="indexDashbord">
      <div className="container">
        <h3 className="center">Modifier votre mot de passe </h3>
        <hr />
      </div>

      <div
        className="row justify-content-center"
        style={{ marginTop: "-60px" }}
      >
        <div className="indexDashbord2 col-xs-10 col-sm-10 col-md-10">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #01934a, green)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(72 85 115 / 40%)",
            }}
          >
            <span>Modification du mot de passe</span>
          </div>{" "}
          {/* <Bbtn
            style={{ width: "25%", fontSize: "25px", cursor: "none" }}
            variant="secondary"
          >
            Utilisateur : {user && user.name}
          </Bbtn>*/}
          <div
            className=" col-xs-1 col-sm-6 col-md-1 "
            style={{ padding: "1px" }}
          >
            {" "}
          </div>
          <tr style={{ paddingTop: "10px" }}>
            {" "}
            <Table className="table" hover>
              <div
                className="card"
                style={{
                  border: "0px",
                  borderRadius: "0px",
                  padding: "20px",
                  margin: "auto",
                  boxShadow:
                    "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
                }}
              >
                <form style={{ marginTop: "0px" }}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "bolder" }}
                      >
                        Ancien mot de passe
                      </label>
                      <input
                        type={`${showpassword ? "text" : "password"}`}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "bolder" }}
                      >
                        Nouveau mot de passe
                      </label>
                      <input
                        type={`${showpassword ? "text" : "password"}`}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`form-control ${
                          newPassword.length > 1 && passworNotConfirm
                            ? "is-invalid"
                            : "is-valid"
                        }`}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        style={{ fontWeight: "bolder" }}
                      >
                        Confirmation{" "}
                      </label>
                      <input
                        type={`${showpassword ? "text" : "password"}`}
                        value={newPassword_c}
                        onChange={(e) => setNewPassword_c(e.target.value)}
                        className={`form-control ${
                          newPassword_c.length > 1 && passworNotConfirm
                            ? "is-invalid"
                            : "is-valid"
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <input
                    id="ckbx"
                    type="checkbox"
                    value={showpassword}
                    onClick={(e) => setShowpassword(!showpassword)}
                  />
                  <label
                    className="form-label pl-2"
                    style={{ fontWeight: "bolder" }}
                    for="ckbx"
                  >
                    {" "}
                    Afficher
                  </label>
                  {newPassword_c.length > 1 && passworNotConfirm ? (
                    <p className="text-danger pl-3">
                      <ul>
                        <li>Les mots de passe doivent être identiques</li>
                      </ul>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="justify-content-center">
                    <button
                      type="submit"
                      disabled={passworNotConfirm}
                      onClick={(e) => modifier(e)}
                      className="btn btn-success btn-block"
                      style={{
                        fontSize: "20px",
                        width: "50%",
                        margin: "auto",
                        marginTop: "20px",
                      }}
                    >
                      Sauvegarder
                    </button>
                  </div>
                </form>
              </div>
            </Table>
          </tr>
        </div>
      </div>
    </Page>
  );
}
