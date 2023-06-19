import { createContext, useEffect, useState } from "react";
import React from "react";
export const PleaseWaitContext = createContext();

export default (props) => {
  const [gWaitOn, setGWaitOn] = useState(false);

  return (
    <PleaseWaitContext.Provider
      value={{ gWaitOn: gWaitOn, setGWaitOn: setGWaitOn }}
    >
      {props.children}
    </PleaseWaitContext.Provider>
  );
};