import { invoke } from "@tauri-apps/api/tauri";

export type Operator = "Plus" | "Minus" | "Multiplication" | "Division" | "Equal" | "None";

export type ButtonNumberProps = {
  buttonNumber: number, 
  number: number
  setNumber: (number: number) => void
};

export type ButtonCommonProps = {
  setNumber: (number: number) => void
};

export type ButtonOperatorProps = {
  operator: Operator, 
  number: number, 
  setNumber: (number: number) => void
};

export type ButtonsProps = {
  number: number,
  setNumber: (number: number) => void
}

const operator_list: Operator[] = ["Plus", "Minus", "Multiplication", "Division", "Equal", "None"];

const onClickNumber = (buttonNumber: number, number: number, setNumber: (number: number) => void) => {
  invoke<number>("on_click_number", {buttonNumber: buttonNumber, number: number}).then(rNumber => {
    setNumber(rNumber);
  });
};

const onClickClear = (setNumber: (number: number) => void) => {
  invoke<number>("on_click_clear").then(rNumber => {
    setNumber(rNumber);
  });
};


const onClickOperator = (operator: Operator, number: number, setNumber: (number: number) => void) => {
  invoke<number>("on_click_operator", {operator: operator, number: number}).then(rNumber => {
    setNumber(rNumber);
  });
};

const onClickPoint = () => {
  invoke("on_click_point");
};

const parseOperator = (operator: Operator) => {
  let operatorReturn = "None";
  if (operator === operator_list[0]) {
    operatorReturn = "+"
  } else if (operator === operator_list[1]) {
    operatorReturn = "-"
  } else if (operator === operator_list[2]) {
    operatorReturn = "x"
  } else if (operator === operator_list[3]) {
    operatorReturn = "÷"
  } else if (operator === operator_list[4]) {
    operatorReturn = "="
  };
  return operatorReturn;
};

document.addEventListener("DOMContentLoaded", () => { invoke("start_up") });

export {onClickNumber, onClickOperator, onClickClear, onClickPoint, parseOperator, operator_list};