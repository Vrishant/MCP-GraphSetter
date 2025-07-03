# MCP Table Management Project

## Project Overview
This project is a multi-part system for managing table data with a focus on fruit attributes and positioning. It consists of three main components:

1. **mcp-client-typescript**: A TypeScript client that uses AI SDKs (Anthropic, OpenAI, ModelContextProtocol) to connect and interact with the MCP server.
2. **mcp-server**: A TypeScript server application (named "weather2") that provides backend logic and schema validation using Zod.
3. **mcp-web**: A web interface with an Express backend and frontend UI that allows users to query the MCP client, manage fruit data, and manually or automatically move fruit items between attribute, row, and column boxes.

---

## Project Structure

- `mcp-client-typescript/`  
  TypeScript client using AI SDKs. Contains source code, build output, and configuration files.

- `mcp-server/`  
  TypeScript server with schema validation and backend logic. Contains source code, build output, and configuration files.

- `mcp-web/`  
  Web interface and backend server using Express. Contains server code, public frontend assets, and static resources.

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or later recommended)
- npm (comes with Node.js)

### mcp-client-typescript

1. Navigate to the `mcp-client-typescript` directory:
   ```bash
   cd mcp-client-typescript
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the client (this expects the server build file path as an argument):
   ```bash
   npm start
   ```

### mcp-server

1. Navigate to the `mcp-server` directory:
   ```bash
   cd ../mcp-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the server (run the built index.js or use a process manager):
   ```bash
   node build/index.js
   ```

### mcp-web

1. Navigate to the `mcp-web` directory:
   ```bash
   cd ../mcp-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the web server:
   ```bash
   npm start
   ```
4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

---

## Usage

- Use the web interface to type or speak queries to the MCP client.
- The interface displays responses with markdown formatting.
- Manage fruit items by moving them between "attributes", "row", and "column" boxes manually or via commands from the MCP server.
- The backend handles query processing and move commands, serving fruit data from a JSON file.

---

## Key Features and Architecture

- **AI-powered client**: Uses Anthropic, OpenAI, and ModelContextProtocol SDKs for intelligent query processing.
- **TypeScript-based server**: Provides robust backend logic with schema validation using Zod.
- **Express web server**: Serves frontend assets and provides REST API endpoints for querying and fruit management.
- **Frontend UI**: Supports text and speech input, displays markdown responses, and allows manual and automatic fruit movement.
- **Real-time updates**: Frontend polls backend for move commands to update the UI dynamically.

---

## Dependencies and Technologies

- Node.js, npm
- TypeScript
- Express, CORS, dotenv, axios
- AI SDKs: @anthropic-ai/sdk, @modelcontextprotocol/sdk, openai
- Zod for schema validation
- Web Speech API for speech recognition (frontend)
- Marked.js for markdown rendering (frontend)

---

## Author

*Add author or contact information here*

---

This README provides an overview and instructions to get started with the MCP Table Management project. For further details, please refer to the source code and comments within each component.
