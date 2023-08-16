import { ChangeEvent, useState } from "react";
import { FormValues } from "../dtos/Form";



type FormEventHandler = (event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement| HTMLSelectElement>) => void;

const HandleForm = (initialState: FormValues) => {
  const [state, setState] = useState<FormValues>(initialState);
  const handleInput: FormEventHandler = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const clearForm = () => setState(initialState);
  const setValues = (values: FormValues) => setState(values);
  return [state, handleInput, clearForm, setValues] as const;
};

export default HandleForm;
