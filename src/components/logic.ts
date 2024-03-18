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

class DisplayCondiiton {
  second_number: number; 
  check_second: boolean; 
  previous_operator: Operator; 
  check_operator: boolean; 
  check_equal: boolean; 
  point: number;

  constructor() {
    this.second_number = 0;
    this.check_second = false;
    this.previous_operator = "None";
    this.check_operator = false;
    this.check_equal = false;
    this.point = 0;
  };

  clear() {
    this.second_number = 0;
    this.check_second = false;
    this.previous_operator = "None";
    this.check_operator = false;
    this.check_equal = false;
    this.point = 0;
  };
};

class DisplayCondiitonNumber {
  condition: DisplayCondiiton;
  number: number;

  constructor() {
    this.condition = new DisplayCondiiton;
    this.number = 0;
  }
}

let condition: DisplayCondiiton = new DisplayCondiiton;

const onClickNumber = (buttonNumber: number, number: number, setNumber: (number: number) => void) => {
  invoke<DisplayCondiitonNumber>("on_click_number", {buttonNumber: buttonNumber, number: number, condition: condition}).then(r => {
    condition = r.condition;
    setNumber(r.number);
  });
};

const onClickClear = (setNumber: (number: number) => void) => {
  invoke<DisplayCondiitonNumber>("on_click_clear").then(r => {
    condition = r.condition;
    setNumber(r.number);
  });
};


const onClickOperator = (operator: Operator, number: number, setNumber: (number: number) => void) => {
  invoke<DisplayCondiitonNumber>("on_click_operator", {operator: operator, number: number, condition: condition}).then(r => {
    condition = r.condition;
    setNumber(r.number);
  });
};

const onClickPoint = () => {
  invoke<DisplayCondiiton>("on_click_point", {condition: condition}).then(c => {
    condition = c;
  });
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

export {onClickNumber, onClickOperator, onClickClear, onClickPoint, parseOperator, operator_list, condition};