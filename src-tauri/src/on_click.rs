use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Condition {
    second_number: f64, 
    check_second: bool, 
    previous_operator: Operator, 
    check_operator: bool, 
    check_equal: bool, 
    point: u32
}

impl Condition {
    fn new() -> Condition {
        Condition { 
            second_number: 0.0, 
            check_second: false, 
            previous_operator: Operator::None, 
            check_operator: false, 
            check_equal: false, 
            point: 0 
        }
    }

    fn clear(&mut self) {
        self.second_number = 0.0;
        self.check_second = false;
        self.previous_operator = Operator::None;
        self.check_operator = false;
        self.check_equal = false;
        self.point = 0;
    }
}

#[derive(Deserialize, Serialize)]
pub enum Operator {
    Plus, 
    Minus, 
    Multiplication, 
    Division, 
    Equal, 
    None
}

#[derive(Serialize)]
pub struct ConditionNumber {
    condition: Condition, 
    number: f64
}

#[tauri::command]
pub fn on_click_number(button_number: u32, number: f64, condition: Condition) -> ConditionNumber {
    let mut number: f64 = number;
    let mut condition: Condition = condition;
    if condition.check_equal {
        condition.clear();
        number = button_number as f64;
    } else if condition.check_operator {
        condition.point = 0;
        condition.check_operator = false;
        number = button_number as f64;
    } else if condition.point == 0 {
        number = (number * 10.0) + (button_number as f64);
    } else {
        number = number + (button_number as f64 / (10u32.pow(condition.point) as f64));
        condition.point += 1;
    };
    ConditionNumber { 
        condition: condition, 
        number: number 
    }
}

#[tauri::command]
pub fn on_click_clear() -> ConditionNumber {
    ConditionNumber { 
        condition: Condition::new(), 
        number: 0.0
    }
}

#[tauri::command]
pub fn on_click_operator(operator: Operator, number: f64, condition: Condition) -> ConditionNumber {
    let mut number: f64 = number;
    let mut condition: Condition = condition;
    if !condition.check_operator {
        condition.check_second = true;
        match condition.previous_operator {
            Operator::Plus => number += condition.second_number, 
            Operator::Minus => number = condition.second_number - number, 
            Operator::Multiplication => number *= condition.second_number, 
            Operator::Division => number = condition.second_number / number, 
            _ => {
                condition.second_number = number;
                condition.check_second = false;
            }
        };
    };
    if let Operator::Equal = operator {
        condition.check_equal = true;
    } else {
        condition.check_equal = false;
    };
    condition.check_operator = true;
    condition.previous_operator = operator;
    ConditionNumber { 
        condition: condition, 
        number: number 
    }
}

#[tauri::command]
pub fn on_click_point(condition: Condition) -> Condition {
    let mut condition: Condition = condition;
    if condition.point == 0 {
        condition.point = 1;
    };
    condition
}