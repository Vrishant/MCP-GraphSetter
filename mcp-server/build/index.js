import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// import { queueFunctionCall } from "../../mcp-web/server.js"; // adjust path
const server = new McpServer({
    name: "bhallaServer",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Add new tool "move-fruit" to call moveFruit in client with arguments fruitName and targetBox
// server.tool(
//   "move-fruit",
//   {
//     fruitName: z.string().describe("Name of the fruit to move"),
//     targetBox: z.string().describe("Target box to move the fruit to"),
//   },
//   async ({ fruitName, targetBox }) => {
//     return {
//       content: [
//         {
//           type: "text",
//           text: `Command to move fruit '${fruitName}' to '${targetBox}' received.`,
//         },
//       ],
//     };
//   }
// );
server.tool("move-fruit", {
    fruitName: z.string().describe("Name of the fruit to move"),
    targetBox: z.string().describe("Target box to move the fruit to"),
}, async ({ fruitName, targetBox }) => {
    try {
        await fetch("http://localhost:3000/api/move-fruit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fruitName, targetBox }),
        });
        return {
            content: [
                {
                    type: "text",
                    text: `Command to move fruit '${fruitName}' to '${targetBox}' sent to client.`,
                },
            ],
        };
    }
    catch (err) {
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to send move-fruit command to frontend.",
                },
            ],
        };
    }
});
// server.tool(
//     "say-word",
//     {
//         arguments: z.string().describe("Word said by the user"),
//     },
//     async ({ arguments: word }) => {
//         return {
//             content: [
//                 {
//                     type: "text",
//                     text: word,
//                 },
//             ],
//         };
//     }
// );
server.tool("list-fruits", {}, async () => {
    try {
        const response = await fetch("http://localhost:3000/assets/fruits.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fruits = await response.json();
        return {
            content: fruits.map(fruit => ({
                type: "text",
                text: fruit,
            })),
        };
    }
    catch (error) {
        console.error("Error fetching fruits.json:", error);
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to load fruits data.",
                },
            ],
        };
    }
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Table MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
