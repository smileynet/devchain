import { sendPostRequest } from "chatgpt-plus-api-client";

export default async function chatApi() {
  let parentMessageId;

  let response = await sendPostRequest({
    prompt: "for loop in js?",
    model: "Default",
  });
  parentMessageId = response.message.id;
  const conversationId = response.conversation_id;
  console.log(response.message.content.parts[0]);

  response = await sendPostRequest({
    prompt: "rewrite it in typescript",
    parentMessageId,
    conversationId,
  });
  parentMessageId = response.message.id;
  console.log(response.message.content.parts[0]);
  console.log(parentMessageId)
}
