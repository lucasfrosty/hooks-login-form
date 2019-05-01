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
import { useLoginReducer, ActionType, State, Action } from "./hooks";

const GlobalContext = React.createContext<
  [State, React.Dispatch<Action>] | null
>(null);

function LoginCard() {
  const [state, dispatch] = React.useContext(GlobalContext);
  const { login, password, loading, error, isLogged } = state;

  const onLogOut = () => {
    dispatch({
      type: ActionType.Logoff
    });
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
    dispatch({
      type: ActionType.ChangeField,
      field: "login",
      payload: login
    });
  };
  const handlePasswordChange = (password: string) => {
    dispatch({
      type: ActionType.ChangeField,
      field: "password",
      payload: password
    });
  };

  const onSubmit = async () => {
    dispatch({
      type: ActionType.StartSubmit
    });

    try {
      const response = await loginAttempt(login, password);

      if (response === "success") {
        dispatch({
          type: ActionType.LoginSuccess
        });
      }
    } catch (error) {
      dispatch({
        type: ActionType.LoginFailure,
        payload: error
      });
    }
  };

  const onReset = () => {
    dispatch({
      type: ActionType.Reset
    });
  };

  return (
    <AppProvider>
      <>
        <Card sectioned>
          <FormLayout>
            {error && <Banner status="critical">{error}</Banner>}
            <TextField
              value={login}
              onChange={handleLoginChange}
              label="Login"
            />
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
        <Child />
      </>
    </AppProvider>
  );
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  const [state, dispatch] = React.useContext(GlobalContext);

  const onResetData = () => {
    dispatch({
      type: ActionType.Reset
    });
  };

  return (
    <AppProvider>
      <Card sectioned>
        <div>{JSON.stringify(state)}</div>
        <Button onClick={onResetData}>Reset</Button>
      </Card>
    </AppProvider>
  );
}

function WrappedComponent() {
  return (
    <GlobalContext.Provider value={useLoginReducer()}>
      <LoginCard />
    </GlobalContext.Provider>
  );
}

export default WrappedComponent;
