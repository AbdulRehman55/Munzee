import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { Container, Button, Input } from "../../components";
import logo from "../../assets/images/munzee-logo-v4-outline.png";
import { ClientContext } from "../../context/ClientContext";

const Login = (): JSX.Element => {
  const { backend } = React.useContext(ClientContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="main">
      <Container>
        <div className="logo2">
          <img src={logo} alt="logo" />
        </div>
        <p className="welcometext">Welcome back,</p>
        <p className="welcometext">Please sign in.</p>
        <div className="form">
          <Input
            placeholder="Email"
            className="loginInput"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            className="loginInput"
            value={password}
            onChange={(e: any) => setPasword(e.target.value)}
            type="password"
          />
          <Button
            className="btn primaryButton sigin-in-button"
            icon={<i className="fa fa-lock"></i>}
            onClick={async () => {
              if (loading) {
                return;
              }
              setLoading(true);
              const result = await backend?.login(email, password);
              if(result?.success === true){
                navigate("/m/" + result.username)
              }
              setLoading(false);
            }}
          >
            Sign in
          </Button>
          <p className="forgot">
            Or
            <br />
            <Link to="/forgotpassword">Have you forgot your password?</Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Login;
