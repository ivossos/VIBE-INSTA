
import React, { useState, useCallback } from 'react';
import type { ColorPalette, CarouselSlideData } from './types';
import { INTENTIONS, COLOR_PALETTES } from './constants';
import { generateCarouselContent, generateImage as generateImageAPI } from './services/geminiService';
import CarouselForm from './components/CarouselForm';
import CarouselPreview from './components/CarouselPreview';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [intention, setIntention] = useState<string>(INTENTIONS[0]);
  const [username, setUsername] = useState<string>('');
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(COLOR_PALETTES[0]);
  const [slides, setSlides] = useState<CarouselSlideData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generateImage, setGenerateImage] = useState<boolean>(true);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Por favor, insira um tópico para o carrossel.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSlides(null);

    try {
      const generatedSlides = await generateCarouselContent(topic, intention);
      
      if (generateImage && generatedSlides.length > 0) {
        const imagePromises = generatedSlides.map(slide => 
          generateImageAPI(slide.title, slide.content)
        );

        const results = await Promise.allSettled(imagePromises);

        const slidesWithImages = generatedSlides.map((slide, index) => {
          const result = results[index];
          if (result.status === 'fulfilled') {
            return { ...slide, imageUrl: result.value };
          }
          return slide;
        });

        const hasFailedImages = results.some(r => r.status === 'rejected');
        if (hasFailedImages) {
          setError("Algumas imagens não puderam ser geradas. Exibindo o conteúdo disponível.");
        }
        
        setSlides(slidesWithImages);

      } else {
        setSlides(generatedSlides);
      }

    } catch (err: any) {
      setError(err.message || "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, [topic, intention, generateImage]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">Crie Carrosséis Incríveis para o Instagram</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Transforme suas ideias em posts visualmente atraentes em segundos. Basta seguir os passos abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <CarouselForm
              topic={topic}
              setTopic={setTopic}
              intention={intention}
              setIntention={setIntention}
              username={username}
              setUsername={setUsername}
              selectedPalette={selectedPalette}
              setSelectedPalette={setSelectedPalette}
              generateImage={generateImage}
              setGenerateImage={setGenerateImage}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          
          <div className="lg:sticky top-8">
             <CarouselPreview
                slides={slides}
                palette={selectedPalette}
                username={username}
                isLoading={isLoading}
                error={error}
             />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
