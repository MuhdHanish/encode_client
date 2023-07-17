import { ChangeEvent, useState } from "react";
import { FormValues } from "../dtos/Form";

type FormEventHandler = (event: ChangeEvent<HTMLInputElement>) => void;

const HandleForm = (initialState: FormValues) => {
  const [state, setState] = useState<FormValues>(initialState);

  const handleInput: FormEventHandler = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return [state, handleInput] as const;
};

export default HandleForm;
