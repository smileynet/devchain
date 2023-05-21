import * as dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";
import { Replicate } from "langchain/llms/replicate";
dotenv.config();

export type LLMModel = OpenAI | Replicate;
export type ChatLLMModel = ChatOpenAI;

const headers = {
  "Helicone-Cache-Enabled": "true",
  "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  "Helicone-User-Id": process.env.HELICONE_USER_ID,
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

export const replicate_vicuna13b = new Replicate({
  model:
    "replicate/vicuna-13b:a68b84083b703ab3d5fbf31b6e25f16be2988e4c3e21fe79c2ff1c18b99e61c1",
  apiKey: process.env.REPLICATE_API_KEY,
});

export const replicate_flant5 = new Replicate({
  model:
    "replicate/flan-t5-xl:7a216605843d87f5426a10d2cc6940485a232336ed04d655ef86b91e020e9210",
  apiKey: process.env.REPLICATE_API_KEY,
});

export const replicate_alpha7b = new Replicate({
  model:
    "stability-ai/stablelm-tuned-alpha-7b:c49dae362cbaecd2ceabb5bd34fdb68413c4ff775111fea065d259d577757beb",
  apiKey: process.env.REPLICATE_API_KEY,
});

export const replicate_dolly12 = new Replicate({
  model:
    "replicate/dolly-v2-12b:ef0e1aefc61f8e096ebe4db6b2bacc297daf2ef6899f0f7e001ec445893500e5",
  apiKey: process.env.REPLICATE_API_KEY,
});

export const replicate_llama7b = new Replicate({
  model:
    "replicate/llama-7b:2014ee1247354f2e81c0b3650d71ca715bc1e610189855f134c30ecb841fae21",
  apiKey: process.env.REPLICATE_API_KEY,
});

export const replicate_gptj6b = new Replicate({
  model:
    "replicate/gpt-j-6b:b3546aeec6c9891f0dd9929c2d3bedbf013c12e02e7dd0346af09c37e008c827",
  apiKey: process.env.REPLICATE_API_KEY,
});

