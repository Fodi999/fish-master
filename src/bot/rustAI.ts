// Объявление типа для модуля WASM
type WasmModule = {
  generate_ai_response: (input: string) => string;
};

let wasmModule: WasmModule | null = null;

export async function getAIResponse(message: string): Promise<string> {
  if (!wasmModule) {
    console.log("Загружаю модуль WASM...");
    const wasm = await import("../../pkg/rust_ai.js");
    await wasm.default(); // Инициализация WASM модуля
    wasmModule = wasm as unknown as WasmModule; // Уточняем тип через unknown
    console.log("Модуль WASM загружен и инициализирован.");
  }

  console.log("Отправляем запрос в WASM:", message);
  const result = wasmModule.generate_ai_response(message); // Вызов функции из Rust через WebAssembly
  console.log("Ответ от WASM:", result);
  return result; // Возвращаем ответ от WASM
}


