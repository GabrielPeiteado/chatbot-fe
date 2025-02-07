/* eslint-disable no-useless-catch */
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  // USER_ROLE,
  // ASSISTANT_ROLE,
  // SYSTEM_ROLE,
  // ERROR_GENERIC,
  PIM,
} from "../utils/constants";


const googleAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

const instruction =
  "Eres un asistente y tu función es ayudar a los clientes a elegir que plato ordenar en el restaurant. Tu nombre es DinnrBot. Solo responde preguntas relacionadas al restaurant o los platos basados en este JSONL que te envio: " +
  PIM +
  " no respondas otras preguntas y si quieren ordenar debes responder que tienen que pedirle al camarero, tu no tienes la capacidad para tomar ordenes. Todas tus respuestas deben tener un formato amigable y lindo para el usuario, utiliza markdown de ser necesario.";

export class Assistant {
  #chat;

  constructor(model = "gemini-1.5-flash", systemInstruction = instruction) {
    const geminiModel = googleAI.getGenerativeModel({
      model,
      systemInstruction,
    });
    this.#chat = geminiModel.startChat({ history: [] });
  }

  async chat(content: string) {
    try {
      const result = await this.#chat.sendMessage(content);
      return result.response.text();
    } catch (error) {
      throw error;
    }
  }

  async *chatStream(content: string) {
    try {
      const result = await this.#chat.sendMessageStream(content);
      for await (const chunk of result.stream) {
        console.log(chunk.text());
        yield chunk.text();
      }
      // return result.response.text();
    } catch (error) {
      throw error;
    }
  }
}
