import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseMarkdownToJson } from "@/lib/utils";
import { createSessionClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      country,
      numberOfDays,
      travelStyle,
      interests,
      budget,
      groupType,
      userId,
    } = body;

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
    Budget: '${budget}'
    Interests: '${interests}'
    TravelStyle: '${travelStyle}'
    GroupType: '${groupType}'
    Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
    {
    "name": "A descriptive title for the trip",
    "description": "A brief description of the trip and its highlights not exceeding 100 words",
    "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
    "duration": ${numberOfDays},
    "budget": "${budget}",
    "travelStyle": "${travelStyle}",
    "country": "${country}",
    "interests": ${interests},
    "groupType": "${groupType}",
    "bestTimeToVisit": [
      '🌸 Season (from month to month): reason to visit',
      '☀️ Season (from month to month): reason to visit',
      '🍁 Season (from month to month): reason to visit',
      '❄️ Season (from month to month): reason to visit'
    ],
    "weatherInfo": [
      '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
    ],
    "location": {
      "city": "name of the city or region",
      "coordinates": [latitude, longitude],
      "openStreetMap": "link to open street map"
    },
    "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
        {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
        {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
      ]
    },
    ...
    ]
    }`;
    const textResult = await genAi
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);

    const trip = parseMarkdownToJson(textResult.response.text());

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query= ${encodeURIComponent(
        `${country} ${interests} ${travelStyle}`
      )}&client_id=${unsplashApiKey}`
    );

    const imageUrls = (await imageResponse.json()).results
      .slice(0, 3)
      .map((result: unknown) => {
        const r = result as { urls?: { regular?: string } };
        return r.urls?.regular || null;
      });

    const sessionClient = await createSessionClient();
    if (!sessionClient) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await sessionClient.database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!,
      ID.unique(),
      {
        tripDetails: JSON.stringify(trip),
        createdAt: new Date().toISOString(),
        imageUrls,
        userId,
      }
    );

    return NextResponse.json(
      { id: result.$id, success: true },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error generating travel plan:", e);
    return NextResponse.json(
      { error: "Failed to generate travel plan", success: false },
      { status: 500 }
    );
  }
}
