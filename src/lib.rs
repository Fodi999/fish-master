use wasm_bindgen::prelude::*;

// Эта функция будет доступна из JavaScript через WebAssembly
#[wasm_bindgen]
pub fn generate_ai_response(input: String) -> String {
    match input.as_str() {
        "Привет" => String::from("Привет! Как я могу помочь?"), // Обрабатываем запрос "Привет"
        "Как дела?" => String::from("Все отлично, спасибо!"), // Обрабатываем запрос "Как дела?"
        _ => String::from("Извините, я не понимаю ваш вопрос."), // Стандартный ответ
    }
}



