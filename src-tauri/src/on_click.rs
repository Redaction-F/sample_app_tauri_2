use std::{fs::{self, File}, io::Write, path::Path};

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

    fn from_json() -> Result<Condition, String> {
        let condition_string: String = match fs::read_to_string("data/condition.json") {
            Ok(o_) => o_, 
            Err(e_) => {
                println!("{}", e_.to_string());
                return Err(e_.to_string())
            }
        };
        match serde_json::from_str::<Condition>(&condition_string) {
            Ok(o_) => Ok(o_), 
            Err(e_) => {
                println!("{}", e_.to_string());
                Err(e_.to_string())
            }
        }
    }

    fn to_json(&self) -> Result<(), String> {
        let condition_string: String = match serde_json::to_string(self) {
            Ok(o_) => o_, 
            Err(e_) => return Err(e_.to_string())
        };
        let mut file: File = match File::create("data/condition.json") {
            Ok(o_) => o_, 
            Err(e_) => return Err(e_.to_string())
        };
        match file.write_all(condition_string.as_bytes()) {
            Ok(o_) => Ok(o_), 
            Err(e_) => Err(e_.to_string())
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

#[tauri::command]
pub fn on_click_number(button_number: u32, number: f64) -> Result<f64, String> {
    let mut number: f64 = number;
    let mut condition: Condition = Condition::from_json()?;
    if condition.check_equal {
        condition.clear();
        number = button_number as f64;
        if condition.check_second {
          condition.second_number = number;
          condition.check_second = false;
        };
    } else if condition.check_operator {
        condition.point = 0;
        condition.check_operator = false;
        number = button_number as f64;
        if condition.check_second {
          condition.second_number = number;
          condition.check_second = false;
        };
    } else if condition.point == 0 {
        number = (number * 10.0) + (button_number as f64);
    } else {
        number = number + (button_number as f64 / (10u32.pow(condition.point) as f64));
        condition.point += 1;
    };
    condition.to_json()?;
    Ok(number)
}

#[tauri::command]
pub fn on_click_clear() -> Result<f64, String> {
    Condition::new().to_json()?;
    Ok(0.0)
}

#[tauri::command]
pub fn on_click_operator(operator: Operator, number: f64) -> Result<f64, String> {
    let mut number: f64 = number;
    let mut condition: Condition = Condition::from_json()?;
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
    condition.to_json()?;
    Ok(number)
}

#[tauri::command]
pub fn on_click_point() -> Result<(), String> {
    let mut condition: Condition = Condition::from_json()?;
    if condition.point == 0 {
        condition.point = 1;
    };
    condition.to_json()?;
    Ok(())
}

#[tauri::command]
pub fn start_up() -> Result<(), String> {
    let path: &Path = Path::new("data");
    if !path.is_dir() {
        if let Err(e_) = fs::create_dir(path) {
            return Err(e_.to_string())
        };
    };
    let mut file: File = match File::create("data/condition.json") {
        Ok(o_) => o_, 
        Err(e_) => {
            println!("{}", e_.to_string());
            return Err(e_.to_string())
        }
    };
    let condition_string: String = match serde_json::to_string(&Condition::new()) {
        Ok(o_) => o_, 
        Err(e_) => return Err(e_.to_string())
    };
    match file.write_all(condition_string.as_bytes()) {
        Ok(o_) => Ok(o_), 
        Err(e_) => Err(e_.to_string())
    }
}