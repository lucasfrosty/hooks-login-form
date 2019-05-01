import * as React from "react";

import {
  Card,
  Button,
  TextField,
  AppProvider,
  FormLayout,
  ButtonGroup,
  Banner,
  Heading
} from "@shopify/polaris";
import "@shopify/polaris/styles.css";

import { loginAttempt } from "../../utils";

function LoginCard() {
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [isLogged, setIsLogged] = React.useState<boolean>(false);

  const resetLoginData = () => {
    setLogin("");
    setPassword("");
    setLoading(false);
    setError("");
  };

  const onLogOut = () => {
    resetLoginData();
    setIsLogged(false);
  };

  if (isLogged) {
    return (
      <AppProvider>
        <Card sectioned>
          <Heading>Welcome {login}!!</Heading>
          <br />
          <Button onClick={onLogOut}>Logoff</Button>
        </Card>
      </AppProvider>
    );
  }

  const handleLoginChange = (login: string) => {
    setLogin(login);
  };
  const handlePasswordChange = (psw: string) => {
    setPassword(psw);
  };

  const onSubmit = async () => {
    setLoading(true);
    error && setError("");

    try {
      const response = await loginAttempt(login, password);

      if (response === "success") {
        setIsLogged(true);
      }
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const onReset = () => {
    resetLoginData();
  };

  return (
    <AppProvider>
      <Card sectioned>
        <FormLayout>
          {error && <Banner status="critical">{error}</Banner>}
          <TextField value={login} onChange={handleLoginChange} label="Login" />
          <TextField
            value={password}
            onChange={handlePasswordChange}
            type="password"
            label="Password"
          />
          <ButtonGroup>
            <Button onClick={onSubmit} primary loading={loading}>
              Login
            </Button>
            <Button onClick={onReset} disabled={loading}>
              Reset
            </Button>
          </ButtonGroup>
        </FormLayout>
      </Card>
    </AppProvider>
  );
}

export default LoginCard;
