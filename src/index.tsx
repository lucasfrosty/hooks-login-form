import * as React from "react";
import { render } from "react-dom";

import {
  LoginWithState,
  LoginWithReducer,
  LoginWithReducerAndContext
} from "./components";

const rootElement = document.getElementById("root");
render(<LoginWithState />, rootElement);
