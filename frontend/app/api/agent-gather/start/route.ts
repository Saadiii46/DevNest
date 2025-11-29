import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const BASE_QUESTIONS = [
  { id: "clientName", text: "Whats your name?" },
  { id: "projectName", text: "What type is of your project/website?" },
  // note: dynamic agent will continue after these
];

// in-memory sessions (dev only)
(global as any).__AGENT_SESSIONS__ = (global as any).__AGENT_SESSIONS__ || {};
const sessions = (global as any).__AGENT_SESSIONS__;

export async function POST() {
  const sessionId = uuidv4();
  sessions[sessionId] = { answers: {}, history: [] };

  // create small system message to seed the agent
  const system = `You are a friendly dev-project agent. Collect website requirements step-by-step. Start by asking client's name and project name. Use short simple English.`;
  sessions[sessionId].system = system;

  return NextResponse.json({
    sessionId,
    firstQuestion: BASE_QUESTIONS[0],
    nextQuestionList: BASE_QUESTIONS,
  });
}
