import React, { useRef, createRef, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';
import type { CarouselSlideData, ColorPalette } from '../types';
import Loader from './Loader';
import CarouselSlide from './CarouselSlide';

interface CarouselPreviewProps {
  slides: CarouselSlideData[] | null;
  palette: ColorPalette;
  username: string;
  isLoading: boolean;
  error: string | null;
}

const Placeholder = () => (
  <div className="aspect-square w-full max-w-lg mx-auto bg-gray-200 dark:bg-gray-700 rounded-2xl flex flex-col justify-center items-center text-center p-8 border-2 border-dashed border-gray-400 dark:border-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Seu carrossel aparecerá aqui</h3>
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
      Preencha as informações ao lado e clique em "Gerar Carrossel" para ver a mágica acontecer.
    </p>
  </div>
);

const CarouselPreview: React.FC<CarouselPreviewProps> = ({ slides, palette, username, isLoading, error }) => {
  const slideRefs = useRef<(React.RefObject<HTMLDivElement>)[]>([]);
  if (slides) {
    slideRefs.current = slides.map(
      (_, i) => slideRefs.current[i] ?? createRef<HTMLDivElement>()
    );
  }

  const handleDownload = useCallback(async (index: number) => {
    const slideElement = slideRefs.current[index]?.current;
    if (!slideElement) {
      console.error("Elemento do slide não encontrado para download.");
      return;
    }

    try {
      const dataUrl = await htmlToImage.toPng(slideElement, { quality: 1, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `carousel-slide-${index + 1}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Falha ao gerar a imagem do slide', err);
    }
  }, []);

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="aspect-square w-full max-w-lg mx-auto flex justify-center items-center">
             <Loader />
        </div>
      );
    }

    // Fatal error: No slides could be generated at all.
    if (error && (!slides || slides.length === 0)) {
      return (
        <div className="aspect-square w-full max-w-lg mx-auto bg-red-100 dark:bg-red-900 border-2 border-red-400 dark:border-red-600 rounded-2xl flex flex-col justify-center items-center text-center p-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-red-800 dark:text-red-200">Ocorreu um erro</h3>
          <p className="mt-1 text-sm text-red-600 dark:text-red-300">{error}</p>
        </div>
      );
    }
    
    if (!slides || slides.length === 0) {
      return <Placeholder />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {slides.map((slide, index) => (
          <div key={index} className="flex flex-col items-center">
            <CarouselSlide
              ref={slideRefs.current[index]}
              slide={slide}
              palette={palette}
              username={username}
              slideNumber={index + 1}
              totalSlides={slides.length}
            />
            <button
              onClick={() => handleDownload(index)}
              className="mt-4 w-full max-w-lg flex justify-center items-center bg-gray-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors dark:bg-gray-600 dark:hover:bg-gray-500 dark:ring-offset-gray-900"
              aria-label={`Baixar o slide ${index + 1}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar Slide
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Non-fatal error/warning: Rendered when slides are present but something (like image generation) failed. */}
      {error && slides && slides.length > 0 && (
         <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-md dark:bg-yellow-900 dark:border-yellow-400 dark:text-yellow-200" role="alert">
            <div className="flex">
                <div className="py-1">
                    <svg className="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"/></svg>
                </div>
                <div>
                    <p className="font-bold">Aviso</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        </div>
      )}
      {renderMainContent()}
    </div>
  );
};

export default CarouselPreview;