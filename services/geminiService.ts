import type { TravelRequest, TravelPlan } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY);

export async function generateTravelPlan(request: TravelRequest): Promise<TravelPlan> {
  if (!API_KEY) {
    throw new Error('Gemini API anahtarı bulunamadı');
  }

  const destinationsText = request.destinations
    .map(d => `${d.city}, ${d.country}`)
    .join(' ve ');

  const prompt = `
Sen bir profesyonel seyahat planlamacısısın. ${destinationsText} için ${request.startDate} ile ${request.endDate} tarihleri arasında ${request.transport} ile yapılacak bir seyahat planı oluştur.

Lütfen aşağıdaki JSON formatında bir plan oluştur:

{
  "cityName": "şehir adı",
  "countryName": "ülke adı",
  "travelDates": "tarih aralığı (Örn: 15-20 Mart 2024)",
  "tripImageUrl": "https://images.pexels.com/photos/[şehir ile ilgili uygun fotoğraf ID]/pexels-photo.jpeg",
  "dailyItinerary": [
    {
      "day": 1,
      "title": "Günün başlığı",
      "activities": [
        {
          "time": "09:00",
          "name": "Aktivite adı",
          "description": "Aktivite açıklaması",
          "imageUrl": "https://images.pexels.com/photos/[ID]/pexels-photo.jpeg",
          "details": ["detay 1", "detay 2"]
        }
      ]
    }
  ],
  "localCuisine": [
    {
      "name": "Yemek adı",
      "description": "Yemek açıklaması",
      "imageUrl": "https://images.pexels.com/photos/[ID]/pexels-photo.jpeg"
    }
  ],
  "importantNotes": ["not 1", "not 2"],
  "weatherForecast": [
    {
      "date": "15 Mart",
      "dayOfWeek": "Pazartesi",
      "temperature": "22°C",
      "condition": "Güneşli",
      "icon": "SUNNY",
      "hourly": [
        {
          "time": "09:00",
          "temperature": "18°C",
          "icon": "SUNNY"
        }
      ]
    }
  ]
}

Sadece JSON formatında yanıt ver, başka açıklama ekleme. Tüm imageUrl alanları için gerçek Pexels fotoğraf URL'leri kullan.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error('API isteği başarısız oldu');
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Geçerli JSON yanıtı alınamadı');
  }

  const plan: TravelPlan = JSON.parse(jsonMatch[0]);
  return plan;
}
