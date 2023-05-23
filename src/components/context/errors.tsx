import { createContext, useContext, useState } from "react";
import EventEmitter from "events";

type ErrorsContext = {
  errors: EventEmitter;
  queue: string[];
  init: (arg: string[]) => void;
  add: (arg: string) => void;
  shift: () => string | undefined;
};

interface ErrorsContextInterface {
  children: React.ReactNode;
}

const ErrorsContext = createContext({} as ErrorsContext);

const ErrorsContextProvider = ({ children }: ErrorsContextInterface) => {
  const [queue, init] = useState<string[]>([]);

  const errors = new EventEmitter();

  const add = (error: string) => {
    console.log(error);
    queue.push(error);
    errors.emit("added", error);
  };

  const shift = () => {
    let error = queue.shift();

    // only emit event if there was something in the queue otherwise return the result of Array.shift() which is undefined
    if (error) errors.emit("removed", error);

    return error;
  };

  return (
    <ErrorsContext.Provider value={{ errors, init, queue, add, shift }}>
      {children}
    </ErrorsContext.Provider>
  );
};

function useErrorsContext() {
  return useContext(ErrorsContext);
}

export { ErrorsContextProvider, useErrorsContext };
