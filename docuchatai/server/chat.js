import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const chat = async (filePath = "./", query) => { // test pdf: ./uploads/hbs-lean-startup.pdf
  // load pdf file
  const loader = new PDFLoader(filePath);

  const data = await loader.load();

  // set chunk size in terms of number of characters
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500, 
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  // set openAi api key

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const template = `Please use the given context to answer the question. 
  Please let me know if you cannot find an answer. 
  Feel free to provide what you know. It does not matter if the answer is not complete, too long or too short.

{context}
Question: {question}
Helpful Answer:`;

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    prompt: PromptTemplate.fromTemplate(template),
  });

  const response = await chain.call({
    query,
  });

  return response;
};

export default chat;
