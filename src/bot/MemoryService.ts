import { Message } from "./ChatBot"; // Импортируйте тип Message из ChatBot.tsx

class MemoryService {
  static saveChatHistory(messages: Message[]): void {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    } catch (e) {
      console.error('Ошибка при сохранении истории чата:', e);
    }
  }

  static getChatHistory(): Message[] {
    try {
      const history = localStorage.getItem('chatHistory');
      return history ? JSON.parse(history) : [];
    } catch (e) {
      console.error('Ошибка при загрузке истории чата:', e);
      return [];
    }
  }

  // Прототип для сохранения обратной связи (RLHF)
  static saveFeedback(messageId: string, feedback: 'positive' | 'negative') {
    try {
      const feedbackData = localStorage.getItem('chatFeedback');
      const feedbacks = feedbackData ? JSON.parse(feedbackData) : {};
      feedbacks[messageId] = feedback;
      localStorage.setItem('chatFeedback', JSON.stringify(feedbacks));
    } catch (e) {
      console.error('Ошибка при сохранении обратной связи:', e);
    }
  }
}

export default MemoryService;


  