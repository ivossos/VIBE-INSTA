
import { GoogleGenAI, Type } from "@google/genai";
import type { CarouselSlideData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "Um título curto e cativante para o slide (máx 10 palavras).",
      },
      content: {
        type: Type.STRING,
        description: "O texto principal do slide (máx 40 palavras), formatado com quebras de linha para melhor legibilidade.",
      },
      slide_type: {
        type: Type.STRING,
        description: "Tipo de slide: 'cover' para o primeiro, 'content' para o meio, ou 'cta' para o último.",
      },
    },
    required: ["title", "content", "slide_type"],
  },
};

export const generateCarouselContent = async (
  topic: string,
  intention: string
): Promise<CarouselSlideData[]> => {
  try {
    const prompt = `
      Você é um especialista em marketing de mídia social, especializado na criação de carrosséis envolventes para o Instagram.
      Gere o conteúdo para um carrossel de 5 slides com base no seguinte tópico e intenção.

      Tópico: "${topic}"
      Intenção: "${intention}"

      A estrutura do carrossel deve ser clara:
      - Slide 1 (cover): Um título forte e um gancho para capturar a atenção. Deve convidar o usuário a deslizar.
      - Slides 2-4 (content): O conteúdo principal, dividido em pontos ou passos digeríveis. Use emojis relevantes para aumentar o engajamento.
      - Slide 5 (cta): Um resumo e uma chamada para ação clara (por exemplo, "Salve este post", "Comente abaixo", "Siga para mais dicas").

      Forneça a saída como um objeto JSON que corresponda ao esquema fornecido. Seja conciso e impactante.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    if (Array.isArray(parsedData) && parsedData.length > 0) {
      return parsedData as CarouselSlideData[];
    } else {
      throw new Error("A resposta da IA não está no formato esperado.");
    }

  } catch (error) {
    console.error("Erro ao gerar conteúdo do carrossel:", error);
    throw new Error("Não foi possível gerar o conteúdo. Verifique o tópico e tente novamente.");
  }
};

export const generateImage = async (title: string, content: string): Promise<string> => {
  try {
    const descriptivePrompt = `Uma imagem cinematográfica e vibrante para um slide de post do Instagram com o título "${title}" e o conteúdo "${content}". Estilo moderno, limpo, focado em engajamento, com cores atraentes. Não inclua nenhum texto na imagem.`;
    
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: descriptivePrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    }

    throw new Error("Nenhuma imagem foi gerada pela IA.");

  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    throw new Error("Não foi possível gerar a imagem.");
  }
};
