# DocuChat: AI powered chat platform where you can upload pdf files and ask question about the content.
- Upload a PDF file
- Ask a question about this file in the (text) chat box
- enable audio interaction and record your question, then get real-time processing and audio response.

# fronted: /docuchatai/src
- React + Ant Design
# Backend: /docuchatai/server
- Express.js

# setp up:
- Node.js 18+
- Obtain an OpenAI API KEY: https://platform.openai.com/
- In /docuchatai/server, create an .env file, copy content from .env.example to .env and paste OpenAI API KEY to OPENAI_API_KEY={Your Key Here}.
- (optional: ) in server/chat.js: modify modelName in model to use the model you want. gpt-3.5-turbo is currently in use, feel free to switch to the lastest model.

# quick start:
- clone repository
- cd docuchatai
- (For frontend dependencies: in docuchatai/)
  npm install
- ((For backend dependencies: in server/)
  cd server
  npm install
- set OpenAI API Key in server/.env
- (in /server) nodejs server.js
- (in ./docuchatai) npm start
- (in browser:)http://localhost:3000

# Limitation:
- No chathistory will be saved, do not support follow up question (you can ask as many as question but for any follow up questions, it will answer as the first time it is asked about that quesiton.)
- Only upload pdf files, other formats of files are not supported.
