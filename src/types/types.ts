export interface OpenAIChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    choices: Choice[];
    model: string;
    system_fingerprint: string;
    usage: Usage;
}

export interface Choice {
    index: number;
    message: Message;
    logprobs: null;
    finish_reason: string;
}

export interface Message {
    role: string;
    content: string;
}

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
