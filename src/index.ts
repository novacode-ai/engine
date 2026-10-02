import { streamText, tool } from 'ai';
import { ModelRouter } from '@novacode-ai/providers';
import { systemTools } from '@novacode-ai/tools';
import os from 'os';

export class NovaAgent {
    /**
     * Executes the Agentic Loop using the requested model.
     */
    // @ts-ignore
    async ask(prompt: string, modelName: string): Promise<any> {
        
        const systemPrompt = `You are Nova Code, an elite, autonomous AI CLI engineer.
Current OS: ${os.platform()}
Home Directory: ${os.homedir()}
Working Directory: ${process.cwd()}

CRITICAL RULES:
1. You have access to powerful system tools (bash, readFile). Use them!
2. Do not ask for permission to run basic commands like 'ls' or 'cat'—just do it.
3. If a user asks you to inspect a project, use the bash tool to list files, then read them to build your context.
4. Keep your final answers concise, terminal-friendly, and professional.`;

        // @ts-ignore
        const result = streamText({
            model: ModelRouter.resolve(modelName),
            system: systemPrompt,
            prompt: prompt,
            tools: {
                // @ts-ignore
                bash: tool(systemTools.bash),
                // @ts-ignore
                readFile: tool(systemTools.readFile)
            },
            maxSteps: 5, // Auto-loop 5 times to solve complex problems
        });

        return result;
    }
}
