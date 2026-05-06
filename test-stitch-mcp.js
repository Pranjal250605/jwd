import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import fs from "fs";

async function main() {
    try {
        console.log("Reading configuration from mcp.config.json...");
        const configData = fs.readFileSync("mcp.config.json", "utf8");
        const config = JSON.parse(configData);
        const stitchConfig = config.mcpServers.stitch;

        console.log(`Initializing transport to ${stitchConfig.url}...`);
        
        // Use SSEClientTransport for HTTP protocol
        const transport = new SSEClientTransport(new URL(stitchConfig.url), {
            headers: stitchConfig.headers || {}
        });

        const client = new Client(
            { name: "stitch-mcp-test", version: "1.0.0" },
            { capabilities: { tools: {} } }
        );

        console.log("Connecting to the Stitch MCP server...");
        await client.connect(transport);
        console.log("Successfully connected to Stitch MCP server!");

        console.log("Fetching available tools...");
        const toolsResponse = await client.listTools();
        
        console.log("\n--- Available Tools Response ---");
        console.log(JSON.stringify(toolsResponse, null, 2));

        // Close the connection explicitly since SSE keeps the process open
        process.exit(0);
    } catch (error) {
        console.error("\nError connecting to Stitch MCP server:");
        console.error(error);
        process.exit(1);
    }
}

main();
