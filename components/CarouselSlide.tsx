
import React, { forwardRef } from 'react';
import type { CarouselSlideData, ColorPalette } from '../types';

interface CarouselSlideProps {
  slide: CarouselSlideData;
  palette: ColorPalette;
  slideNumber: number;
  totalSlides: number;
  username?: string;
}

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(({ slide, palette, slideNumber, totalSlides, username = '@seunomeaqui' }, ref) => {
  const contentWithBreaks = slide.content.replace(/\n/g, '<br />');
  const hasImage = !!slide.imageUrl;

  const renderSlideContent = () => {
    switch (slide.slide_type) {
      case 'cover':
        return (
          <div className={`flex flex-col justify-center items-center text-center h-full ${hasImage ? 'p-8' : 'p-16'} overflow-hidden`}>
            <h2 className={`${hasImage ? 'text-2xl' : 'text-3xl lg:text-4xl'} font-extrabold tracking-tight leading-tight break-words max-w-full px-2`}>
              {slide.title}
            </h2>
            <p
              className={`mt-4 ${hasImage ? 'text-sm' : 'text-base lg:text-lg'} ${palette.secondary} tracking-normal leading-relaxed break-words max-w-full px-2`}
              dangerouslySetInnerHTML={{ __html: contentWithBreaks }}
            />
            {!hasImage && (
                <div className={`absolute bottom-8 text-sm font-semibold ${palette.secondary}`}>
                <p>Deslize para o lado &rarr;</p>
              </div>
            )}
          </div>
        );
      case 'cta':
        return (
          <div className={`flex flex-col justify-center items-center text-center h-full ${hasImage ? 'p-8' : 'p-16'} overflow-hidden`}>
            <h3 className={`${hasImage ? 'text-lg' : 'text-xl lg:text-2xl'} font-bold ${palette.secondary} tracking-tight leading-snug break-words max-w-full px-2`}>{slide.title}</h3>
            <p className={`mt-4 ${hasImage ? 'text-base' : 'text-lg lg:text-xl'} font-semibold tracking-normal leading-relaxed break-words max-w-full px-2`} dangerouslySetInnerHTML={{ __html: contentWithBreaks }} />
            <div className={`mt-6 px-6 py-3 rounded-lg ${palette.primary}`}>
              <span className={`${hasImage ? 'text-sm' : 'text-base'} ${palette.text.startsWith('text-') ? palette.text : 'text-white'} tracking-wide`}>Siga para mais!</span>
            </div>
          </div>
        );
      default: // 'content'
        return (
          <div className={`flex flex-col h-full ${hasImage ? 'justify-start p-10' : 'justify-center p-12'} overflow-hidden`}>
            <h3 className={`${hasImage ? 'text-lg' : 'text-lg lg:text-xl'} font-bold ${palette.secondary} tracking-tight leading-snug break-words max-w-full`}>{slide.title}</h3>
            <p className={`mt-4 ${hasImage ? 'text-sm' : 'text-base lg:text-lg'} leading-relaxed tracking-normal break-words max-w-full`} dangerouslySetInnerHTML={{ __html: contentWithBreaks }} />
          </div>
        );
    }
  };
  
  if (hasImage) {
    return (
      <div
        ref={ref}
        className={`aspect-square w-full max-w-lg mx-auto shadow-2xl rounded-2xl overflow-hidden flex flex-col ${palette.background} ${palette.text}`}
      >
        <div className="w-full h-3/5 relative">
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 text-sm font-bold text-white bg-black bg-opacity-40 px-2 py-1 rounded">
            {username}
          </div>
          <div className="absolute bottom-4 right-4 text-xs font-mono px-2 py-1 rounded bg-black bg-opacity-40 text-white">
            {slideNumber}/{totalSlides}
          </div>
        </div>
        <div className="relative flex-grow flex flex-col">
          {renderSlideContent()}
        </div>
      </div>
    );
  }

  // No image layout
  return (
    <div
      ref={ref}
      className={`aspect-square w-full max-w-lg mx-auto shadow-2xl rounded-2xl overflow-hidden relative flex flex-col ${palette.background} ${palette.text}`}
    >
      <div className="relative z-20 flex-grow flex flex-col">
        {renderSlideContent()}
      </div>
      <div className={`absolute bottom-4 right-4 text-xs font-mono px-2 py-1 rounded opacity-80 ${palette.primary} ${palette.text.startsWith('text-') ? palette.text : 'text-white'}`}>
        {slideNumber}/{totalSlides}
      </div>
      <div className={`absolute top-4 left-4 text-sm font-bold opacity-70`}>
        {username}
      </div>
    </div>
  );
});

export default CarouselSlide;
