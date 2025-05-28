import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseMarkdownToJson } from "@/lib/utils";
import { createSessionClient } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    // Get the session client to identify the logged-in user
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { account, database } = sessionClient;

    // Get the current user's account ID
    const userAccount = await account.get();
    const accountId = userAccount.$id;

    // Find the user document using the accountId
    const userQuery = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      [Query.equal("accountId", accountId)]
    );

    if (userQuery.total === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = userQuery.documents[0].$id; // Use the user document ID

    // Parse the request body (trip details)
    const body = await request.json();
    const { country, numberOfDays, travelStyle, interests, budget, groupType } =
      body;

    // Validate required fields
    if (
      !country ||
      !numberOfDays ||
      !travelStyle ||
      !interests ||
      !budget ||
      !groupType
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

    const prompt = `CRITICAL INSTRUCTION: You MUST generate a COMPLETELY UNIQUE ${numberOfDays}-day travel itinerary for ${country}. DUPLICATE OR GENERIC RESPONSES ARE STRICTLY FORBIDDEN.

    UNIQUENESS ENFORCEMENT - MANDATORY:
    🚫 NO GENERIC "Day 1: Arrive and explore" activities
    🚫 NO REPEATED activity patterns from previous generations
    🚫 NO STANDARD TOURIST TRAPS as primary activities
    🚫 NO COPY-PASTE descriptions or templated responses
    ✅ MUST discover lesser-known attractions and hidden gems
    ✅ MUST include unique local experiences specific to this generation
    ✅ MUST vary accommodation types and specific properties
    ✅ MUST create original activity combinations never suggested before
    ✅ MUST include seasonal/temporal unique elements (current local events, festivals)
    ✅ MUST provide alternative routes and unconventional itinerary flow

    User Requirements:
    Budget: '${budget}'
    Interests: '${interests}'
    TravelStyle: '${travelStyle}'
    GroupType: '${groupType}'

    UNIQUENESS CREATIVITY REQUIREMENTS:
    - Generate ORIGINAL trip names - avoid generic formats like "Adventure in [Country]"
    - Include SPECIFIC local neighborhoods, not just city centers
    - Mention EXACT establishments with unique character (family-run restaurants, artisan workshops)
    - Include UNCONVENTIONAL timing (sunrise activities, late-night markets, weekday specials)
    - Suggest ALTERNATIVE transportation methods (local ferries, vintage trains, bike routes)
    - Include INTERACTIVE experiences (cooking with locals, craft workshops, volunteer opportunities)
    - Mention SEASONAL-SPECIFIC activities happening during visit time
    - Include BUDGET-SPECIFIC unique options (luxury exclusives OR budget insider tips)

    MANDATORY REQUIREMENTS - DO NOT SKIP ANY:
    - Generate EXACTLY ${numberOfDays} days in the itinerary array - NO MORE, NO LESS
    - Each day MUST have MINIMUM 3 activities (Morning, Afternoon, Evening)
    - ALL fields in the JSON structure below are REQUIRED - missing ANY field is FAILURE
    - Provide REAL, specific locations with ACTUAL coordinates
    - Include diverse local experiences and hidden gems
    - Mix adventure, culture, food, or relaxation based on interests
    - Vary accommodation suggestions (hostels, boutique hotels, luxury stays)

    ABSOLUTE REQUIREMENTS:
    ✅ MUST provide a UNIQUE descriptive trip name (not generic templates)
    ✅ MUST provide ORIGINAL trip description highlighting unique aspects (max 100 words)
    ✅ MUST provide realistic estimated price in USD format ($XXXX)
    ✅ MUST provide ALL 4 seasons in bestTimeToVisit array with SPECIFIC reasons
    ✅ MUST provide ALL 4 seasons in weatherInfo array with temperature ranges
    ✅ MUST provide location object with city, real coordinates, and OpenStreetMap link
    ✅ MUST provide EXACTLY ${numberOfDays} itinerary days
    ✅ EACH day MUST have day number, location, and minimum 3 UNIQUE activities
    ✅ EACH activity MUST have time and DETAILED, SPECIFIC description with local context

    UNIQUENESS VALIDATION CHECKLIST:
    ❓ Would another AI generate the exact same itinerary for these parameters?
    ❓ Are the activities something locals would recommend vs tourist guides?
    ❓ Does each day offer a completely different experience and perspective?
    ❓ Are the restaurant/accommodation suggestions specific and unique?
    ❓ Would this itinerary surprise even frequent travelers to this destination?
    
    IF ANY ANSWER IS "NO" - REGENERATE WITH MORE CREATIVITY AND ORIGINALITY.

    FAILURE TO PROVIDE UNIQUE, ORIGINAL CONTENT WILL RESULT IN IMMEDIATE REJECTION.

    Return ONLY the complete JSON structure below with ALL fields filled with UNIQUE content:
    {
    "name": "REQUIRED: A UNIQUE, creative title for the trip (avoid generic patterns)",
    "description": "REQUIRED: An ORIGINAL description highlighting unique aspects of THIS specific itinerary, not exceeding 100 words",
    "estimatedPrice": "REQUIRED: Lowest average price for the trip in USD, e.g.$1200",
    "duration": ${numberOfDays},
    "budget": "${budget}",
    "travelStyle": "${travelStyle}",
    "country": "${country}",
    "interests": "${interests}",
    "groupType": "${groupType}",
    "bestTimeToVisit": [
      "REQUIRED: 🌸 Spring (March to May): UNIQUE specific reason to visit with local context",
      "REQUIRED: ☀️ Summer (June to August): UNIQUE specific reason to visit with local context", 
      "REQUIRED: 🍁 Autumn (September to November): UNIQUE specific reason to visit with local context",
      "REQUIRED: ❄️ Winter (December to February): UNIQUE specific reason to visit with local context"
    ],
    "weatherInfo": [
      "REQUIRED: ☀️ Spring: XX-XX°C (XX-XX°F)",
      "REQUIRED: 🌦️ Summer: XX-XX°C (XX-XX°F)",
      "REQUIRED: 🌧️ Autumn: XX-XX°C (XX-XX°F)", 
      "REQUIRED: ❄️ Winter: XX-XX°C (XX-XX°F)"
    ],
    "location": {
      "city": "REQUIRED: name of the main city or region",
      "coordinates": [REQUIRED_LATITUDE_NUMBER, REQUIRED_LONGITUDE_NUMBER],
      "openStreetMap": "REQUIRED: https://www.openstreetmap.org/#map=10/latitude/longitude"
    },
    "itinerary": [
    {
      "day": 1,
      "location": "REQUIRED: SPECIFIC City/Region/Neighborhood Name",
      "activities": [
        {"time": "Morning", "description": "REQUIRED: UNIQUE detailed morning activity with emoji and local context"},
        {"time": "Afternoon", "description": "REQUIRED: UNIQUE detailed afternoon activity with emoji and local context"},
        {"time": "Evening", "description": "REQUIRED: UNIQUE detailed evening activity with emoji and local context"}
      ]
    }
    // REPEAT FOR ALL ${numberOfDays} DAYS WITH COMPLETELY DIFFERENT ACTIVITIES - NO EXCEPTIONS
    ]
    }

    CRITICAL FINAL CHECK: 
    - Is this itinerary something NO OTHER AI would generate for the same parameters?
    - Does every activity showcase a unique aspect of ${country}?
    - Would this surprise and delight travelers looking for authentic experiences?
    
    Replace ALL "REQUIRED:" placeholders with UNIQUE, ORIGINAL content. Generate COMPLETE data for ALL ${numberOfDays} days. DO NOT use placeholders, ellipsis (...), generic descriptions, or templated content. EVERY field must be filled with CREATIVE, SPECIFIC, UNIQUE information that stands apart from typical travel suggestions.`;

    const textResult = await genAi
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);

    const trip = parseMarkdownToJson(textResult.response.text());

    const getRandomPage = () => Math.floor(Math.random() * 5) + 1;
    const getRandomQueryWords = () => {
      const extras = [
        "exploring",
        "wanderlust",
        "local life",
        "hidden gem",
        "adventure",
      ];
      return extras[Math.floor(Math.random() * extras.length)];
    };

    const imageQuery = `${encodeURIComponent(
      `${country} ${interests} ${travelStyle} ${getRandomQueryWords()}`
    )}`;

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${imageQuery}&client_id=${unsplashApiKey}&page=${getRandomPage()}&per_page=10`
    );

    const imageUrls = (await imageResponse.json()).results
      .sort(() => 0.5 - Math.random()) // Shuffle results
      .slice(0, 3)
      .map((result: unknown) => {
        const r = result as { urls?: { regular?: string } };
        return r.urls?.regular || null;
      });

    const result = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!,
      ID.unique(),
      {
        userId, 
        tripDetails: JSON.stringify(trip),
        createdAt: new Date().toISOString(),
        imageUrls,
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
