
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
          <div className={`flex flex-col justify-center items-center text-center h-full ${hasImage ? 'px-6 py-8' : 'px-12 pt-16 pb-20'} overflow-hidden`}>
            <h2 className={`${hasImage ? 'text-xl' : 'text-2xl lg:text-3xl'} font-extrabold tracking-tight leading-tight break-words w-full`}>
              {slide.title}
            </h2>
            <p
              className={`mt-3 ${hasImage ? 'text-xs' : 'text-sm lg:text-base'} ${palette.secondary} tracking-normal leading-relaxed break-words w-full`}
              dangerouslySetInnerHTML={{ __html: contentWithBreaks }}
            />
            {!hasImage && (
                <div className={`absolute bottom-10 text-xs font-semibold ${palette.secondary}`}>
                <p>Deslize para o lado &rarr;</p>
              </div>
            )}
          </div>
        );
      case 'cta':
        return (
          <div className={`flex flex-col justify-center items-center text-center h-full ${hasImage ? 'px-6 py-6' : 'px-12 pt-16 pb-20'} overflow-hidden`}>
            <h3 className={`${hasImage ? 'text-base' : 'text-lg lg:text-xl'} font-bold ${palette.secondary} tracking-tight leading-snug break-words w-full`}>{slide.title}</h3>
            <p className={`mt-3 ${hasImage ? 'text-sm' : 'text-base lg:text-lg'} font-semibold tracking-normal leading-relaxed break-words w-full`} dangerouslySetInnerHTML={{ __html: contentWithBreaks }} />
            <div className={`mt-4 px-5 py-2.5 rounded-lg ${palette.primary}`}>
              <span className={`${hasImage ? 'text-xs' : 'text-sm'} ${palette.text.startsWith('text-') ? palette.text : 'text-white'} tracking-wide`}>Siga para mais!</span>
            </div>
          </div>
        );
      default: // 'content'
        return (
          <div className={`flex flex-col h-full ${hasImage ? 'justify-start px-6 py-6' : 'justify-center px-12 pt-16 pb-20'} overflow-hidden`}>
            <h3 className={`${hasImage ? 'text-base' : 'text-base lg:text-lg'} font-bold ${palette.secondary} tracking-tight leading-snug break-words w-full`}>{slide.title}</h3>
            <p className={`mt-3 ${hasImage ? 'text-xs' : 'text-sm lg:text-base'} leading-relaxed tracking-normal break-words w-full`} dangerouslySetInnerHTML={{ __html: contentWithBreaks }} />
          </div>
        );
    }
  };
  
  if (hasImage) {
    return (
      <div
        ref={ref}
        className={`aspect-square w-full max-w-lg mx-auto shadow-2xl rounded-2xl overflow-hidden flex flex-col ${palette.background} ${palette.text}`}
        style={{ wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}
      >
        <div className="w-full h-1/2 relative">
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 text-sm font-bold text-white bg-black bg-opacity-40 px-2 py-1 rounded">
            {username}
          </div>
          <div className="absolute bottom-4 right-4 text-xs font-mono px-2 py-1 rounded bg-black bg-opacity-40 text-white">
            {slideNumber}/{totalSlides}
          </div>
        </div>
        <div className="relative flex-grow flex flex-col overflow-hidden">
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
      style={{ wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}
    >
      <div className="relative z-20 flex-grow flex flex-col overflow-hidden">
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
