import { NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/gemini';

export async function POST(req: Request) {
  const body = await req.json();
  const prompt = `
Generate a travel itinerary based on:
Name: ${body.name}
Contact: ${body.contact}
Email: ${body.email}
Trip Description: ${body.description}
Return a day-wise plan with suggestions for places, travel, food, and tips.
  `;
  const itinerary = await generateItinerary(prompt);
  return NextResponse.json({ itinerary });
}
