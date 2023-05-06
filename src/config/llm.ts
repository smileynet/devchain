import * as dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";

dotenv.config();

const headers = {
  "Helicone-Cache-Enabled": "true",
  "Helicone-Auth": `Bearer ${process.env.HELICON_API_KEY}`,
  "Helicone-User-Id": process.env.HELICON_USER_ID,
};

const configuration = {
  basePath: process.env.HELICONE_API_URL,
  baseOptions: {
    headers: headers,
  },
};

const temperature = process.env.TEMPERATURE
  ? parseInt(process.env.TEMPERATURE)
  : 0.35;
const verbose = process.env.VERBOSE === "true";

export const gptTurbo = new ChatOpenAI(
  {
    modelName: "gpt-3.5-turbo",
    temperature: temperature,
    verbose: verbose,
  },
  configuration
);

export const gpt4 = new ChatOpenAI(
  {
    modelName: "gpt-4",
    temperature: temperature,
    verbose: verbose,
  },
  configuration
);

export const davinci = new OpenAI(
  {
    modelName: "text-davinci-003",
    temperature: temperature,
    verbose: verbose,
  },
  configuration
);
