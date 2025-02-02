import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';

let model: use.UniversalSentenceEncoder | null = null;
let memory: { phrases: string[]; embeddings: number[][] } | null = null;

// Загружаем модель и память
async function loadModelAndMemory() {
  if (!model) {
    model = await use.load();
  }
  if (!memory) {
    const res = await fetch('./model/memory.json');
    memory = await res.json();
  }
  return { model, memory };
}

// Сохраняем новые фразы в память
function saveNewPhrase(newPhrase: string) {
  if (memory) {
    memory.phrases.push(newPhrase);
    // Нужно пересчитать эмбеддинги для всех фраз, включая новую
    (async () => {
      const inputEmbedding = await model?.embed(memory.phrases);
      const embeddingsArray = (await inputEmbedding?.array()) as number[][];
      memory.embeddings = embeddingsArray;
      // Сохраняем обновленную память в файл или локальное хранилище
      localStorage.setItem('chatMemory', JSON.stringify(memory));
    })();
  }
}

// Функция вычисления косинусного сходства
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

// Генерация ответа с автоматическим обучением
export async function generateResponse(currentInput: string, _context: string[]): Promise<string> {
  const { model, memory } = await loadModelAndMemory();
  if (!memory) {
    return "Извините, я не понял ваш вопрос.";
  }

  const inputEmbedding = await model?.embed([currentInput]);
  const inputVector = (await inputEmbedding?.array()) as number[][];
  const userVector = inputVector[0];

  let bestIndex = 0;
  let bestScore = -Infinity;

  for (let i = 0; i < memory.embeddings.length; i++) {
    const score = cosineSimilarity(userVector, memory.embeddings[i]);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }

  const threshold = 0.05;
  if (bestScore < threshold) {
    // Если сходство низкое, спрашиваем у пользователя правильный ответ
    const correctAnswer = prompt("Я не понял ваш вопрос, можете подсказать, что мне ответить?");
    if (correctAnswer) {
      saveNewPhrase(correctAnswer);
      return `Спасибо! Я запомнил ваш ответ: "${correctAnswer}".`;
    }
    return "Я не совсем понял ваш запрос, не могли бы вы уточнить?";
  }

  return memory.phrases[bestIndex] || "Извините, я не понял ваш вопрос.";
}


