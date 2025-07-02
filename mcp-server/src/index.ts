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

server.tool(
    "say-word",
    {
        arguments: z.string().describe("Word said by the user"),
    },
    async ({ arguments: word }) => {
        return {
            content: [
                {
                    type: "text",
                    text: word,
                },
            ],
        };
    }
);


async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Table MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
