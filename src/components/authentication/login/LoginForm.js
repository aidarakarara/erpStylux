import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Select,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import auth from "../../../api/auth";
// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState(null);
  const [users, setUsers] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    auth.get("api/users_list").then((res) => setUsers(res.data));
  }, []);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.get("sanctum/csrf-cookie").then((response) => {
      const data = { email, password };
      auth
        .post("api/login", data)
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("user-token", res.data.data.token);
            localStorage.setItem("user-role", role);
            //console.log();
            switch (role) {
              case "pompiste":
                navigate("/pompistes", { replace: true });
                break;
              case "gerant":
                navigate("/gerants", { replace: true });
                break;
              case "admin":
                navigate("/admin", { replace: true });
                break;
              default:
                navigate("/chefpistes", { replace: true });
                break;
            }
          } else {
            setErr("Mot de passe Incorrect");
          }
        })
        .catch((error) => {
          setErr("Mot de passe Incorrect");
          //setErr(error.message);
        });
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <select
          required
          className={`form-control`}
          onChange={(e) => {
            var user1 = JSON.parse(e.target.value);
            setEmail(user1.email);
            setRole(user1.role.nom);
          }}
        >
          <option selected value="">
            --- Identifiant---
          </option>
          <optgroup label="Gérants">
            {users && users?.gerant &&
              users?.gerant.map((user) => (
                <option key={user?.id} value={JSON.stringify(user)}>
                  {user?.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Chefs de Pistes">
            {users &&  users?.chefpiste &&
              users?.chefpiste.map((user) => (
                <option key={user?.id} value={JSON.stringify(user)}>
                  {user?.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Pompistes">
            {users &&users?.pompiste &&
              users?.pompiste.map((user) => (
                <option key={user?.id} value={JSON.stringify(user)}>
                  {user?.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Admin">
            {users &&  users?.admin &&
              users?.admin.map((user) => (
                <option key={user?.id} value={JSON.stringify(user)}>
                  {user?.name}
                </option>
              ))}
          </optgroup>
        </select>

        <div
          className="input-group mb-3"
          style={{ border: err ? "2px solid red" : "" }}
        >
          <input
            type={showPassword ? "text" : "password"}
            class="form-control "
            required
            // style={{border:'red !important'}}
            placeholder="Mot de passe"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setPassword(e.target.value);
              setErr(null);
            }}
          />
          <span className="input-group-text" id="basic-addon2">
            <Icon
              onClick={handleShowPassword}
              icon={showPassword ? eyeFill : eyeOffFill}
            />
          </span>
        </div>
      </Stack>

      {err && <p style={{ color: "red" }}>{err}</p>}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        className="my-2"
      >
         CONNEXION
      </LoadingButton>
    </form>
  );
}
