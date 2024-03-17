// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate sample_app_2;
use sample_app_2::on_click;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![on_click::on_click_number, on_click::on_click_clear, on_click::on_click_operator, on_click::on_click_point])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
