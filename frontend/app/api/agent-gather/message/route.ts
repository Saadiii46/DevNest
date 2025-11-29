import { NextResponse } from "next/server";
import OpenAI from "openai";

(global as any).__AGENT_SESSIONS__ = (global as any).__AGENT_SESSIONS__ || {};
const sessions = (global as any).__AGENT_SESSIONS__;

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, questionId, answer } = body;
    if (!sessionId || !questionId)
      return NextResponse.json({ error: "missing" }, { status: 400 });

    if (!sessions[sessionId])
      sessions[sessionId] = { answers: {}, history: [], system: "" };
    // save answer
    sessions[sessionId].answers[questionId] = answer;
    sessions[sessionId].history.push({
      role: "user",
      content: `${questionId}: ${answer}`,
    });

    // Build prompt for OpenAI: include system + current answers
    const systemPrompt =
      sessions[sessionId].system ||
      "You are an agent that collects website requirements and dont repeat any question after you once asked strongly follow it.";
    const currentAnswers = JSON.stringify(sessions[sessionId].answers);

    const prompt = `
You are a helpful assistant that gathers complete website requirements from a client or user.
Follow this structured process step by step and dont repaet any of the questions once asked move to another.
After each answer, ask only one next most useful question until all details are gathered and  strictly don't repeat any question once you mentioned  .
When all information is complete, reply only with DONE.

Use this question order:

Purpose & Goals
– What is the main purpose or goal of your website?
– Who is your target audience?
– What do you want users to do on your site (e.g., buy, sign up, contact, learn)?

Pages & Sections
– What pages do you want (e.g., Home, About, Services, Contact)?
– What sections should be on the homepage (hero, features, testimonials, etc.)?
– Do you need a blog or news section?
– Do you need a gallery, portfolio, or products section?

Design & Layout
– What style or theme do you prefer (modern, minimal, bold, elegant)?
– Do you have color preferences or brand colors?
– Do you want a dark/light mode toggle?
– Should the layout be single-page or multi-page?

Features & Functionality
– Do you need user login/signup?
– Will there be an admin dashboard?
– Do you need contact forms or chat support?
– Any special integrations (payment gateway, API, AI, etc.)?
– Should it include animations or interactive elements?

Content & Media
– Will you provide text and images, or should they be created?
– Do you want videos, icons, or illustrations?
– Do you want testimonials, FAQs, or case studies?

Technical & SEO
– Do you want it built with Next.js, React, WordPress, or something else?
– Should it be SEO-optimized?
– Do you need Google Analytics or any tracking tools?
– Should it support multiple languages?

Deployment & Maintenance
– Where will it be hosted (Vercel, Netlify, etc.)?
– Do you want ongoing maintenance or updates?

When all information is collected, respond only with DONE.

Current answers: ${currentAnswers}


`;

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...sessions[sessionId].history, // keep all chat so it remembers
        {
          role: "user",
          content: `New answer added: ${questionId} = ${answer}. Continue next question.`,
        },
      ],
      temperature: 0.6,
      max_tokens: 100,
    });

    const text = (res.choices?.[0]?.message?.content || "").trim();

    // If OpenAI says done, return done
    if (!text)
      return NextResponse.json({ error: "no-response" }, { status: 500 });
    if (
      text.toLowerCase().includes("done") ||
      text.toLowerCase().includes("all set")
    ) {
      return NextResponse.json({ done: true });
    }

    // Create a safe question id (timestamp) and store it in session so next answer maps back
    const qId = `q_${Date.now()}`;
    // push the agent question into history
    sessions[sessionId].history.push({ role: "assistant", content: text, qId });

    return NextResponse.json({ nextQuestion: { id: qId, text } });
  } catch (err) {
    console.error("agent/message error", err);
    return NextResponse.json({ error: "server-error" }, { status: 500 });
  }
}
