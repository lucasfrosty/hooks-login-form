import * as React from "react";

interface State {
  login: string;
  password: string;
  error: string;
  loading: boolean;
  isLogged: boolean;
}

export enum ActionType {
  LoginSuccess,
  LoginFailure,
  Reset,
  ChangeField,
  StartSubmit,
  Logoff
}

interface Action {
  type: ActionType;
  payload?: string;
  field?: string;
}

const initialState: State = {
  login: "",
  password: "",
  error: "",
  loading: false,
  isLogged: false
};

function loginReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.ChangeField:
      return { ...state, [action.field]: action.payload };
    case ActionType.Reset:
      return initialState;
    case ActionType.LoginSuccess:
      return { ...state, isLogged: true, loading: false };
    case ActionType.LoginFailure:
      return { ...state, error: action.payload, loading: false };
    case ActionType.StartSubmit:
      return { ...state, error: "", loading: true };
    case ActionType.Logoff:
      return { ...initialState, isLogged: false };
    default:
      return state;
  }
}

export function useLoginReducer() {
  return React.useReducer(loginReducer, initialState);
}
