
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
          <div className="flex flex-col justify-center items-center text-center h-full overflow-hidden" style={{ padding: hasImage ? '48px 40px' : '120px 80px 140px' }}>
            <h2 className="font-extrabold tracking-tight leading-tight break-words w-full" style={{ fontSize: hasImage ? '52px' : '72px', lineHeight: '1.2' }}>
              {slide.title}
            </h2>
            <p
              className={`${palette.secondary} tracking-normal leading-relaxed break-words w-full`}
              style={{ fontSize: hasImage ? '28px' : '36px', marginTop: '24px', lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{ __html: contentWithBreaks }}
            />
            {!hasImage && (
                <div className={`absolute font-semibold ${palette.secondary}`} style={{ bottom: '80px', fontSize: '24px' }}>
                <p>Deslize para o lado &rarr;</p>
              </div>
            )}
          </div>
        );
      case 'cta':
        return (
          <div className="flex flex-col justify-center items-center text-center h-full overflow-hidden" style={{ padding: hasImage ? '48px 40px' : '120px 80px 140px' }}>
            <h3 className={`font-bold ${palette.secondary} tracking-tight leading-snug break-words w-full`} style={{ fontSize: hasImage ? '40px' : '56px', lineHeight: '1.3' }}>{slide.title}</h3>
            <p className="font-semibold tracking-normal leading-relaxed break-words w-full" style={{ fontSize: hasImage ? '32px' : '42px', marginTop: '24px', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: contentWithBreaks }} />
            <div className={`rounded-lg ${palette.primary}`} style={{ marginTop: '32px', padding: '20px 40px' }}>
              <span className={`${palette.text.startsWith('text-') ? palette.text : 'text-white'} tracking-wide`} style={{ fontSize: hasImage ? '28px' : '32px' }}>Siga para mais!</span>
            </div>
          </div>
        );
      default: // 'content'
        return (
          <div className={`flex flex-col h-full overflow-hidden`} style={{ padding: hasImage ? '48px 40px' : '120px 80px 140px', justifyContent: hasImage ? 'flex-start' : 'center' }}>
            <h3 className={`font-bold ${palette.secondary} tracking-tight leading-snug break-words w-full`} style={{ fontSize: hasImage ? '40px' : '50px', lineHeight: '1.3' }}>{slide.title}</h3>
            <p className="leading-relaxed tracking-normal break-words w-full" style={{ fontSize: hasImage ? '28px' : '34px', marginTop: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: contentWithBreaks }} />
          </div>
        );
    }
  };
  
  if (hasImage) {
    return (
      <div
        ref={ref}
        className={`flex flex-col ${palette.background} ${palette.text}`}
        style={{
          width: '1080px',
          height: '1080px',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto',
          borderRadius: '40px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div className="w-full h-1/2 relative">
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute text-white bg-black bg-opacity-40 rounded" style={{ top: '32px', left: '32px', fontSize: '28px', fontWeight: 'bold', padding: '12px 16px' }}>
            {username}
          </div>
          <div className="absolute font-mono bg-black bg-opacity-40 text-white rounded" style={{ bottom: '32px', right: '32px', fontSize: '22px', padding: '12px 16px' }}>
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
      className={`relative flex flex-col ${palette.background} ${palette.text}`}
      style={{
        width: '1080px',
        height: '1080px',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
        borderRadius: '40px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div className="relative z-20 flex-grow flex flex-col overflow-hidden">
        {renderSlideContent()}
      </div>
      <div className={`absolute font-mono rounded opacity-80 ${palette.primary} ${palette.text.startsWith('text-') ? palette.text : 'text-white'}`} style={{ bottom: '32px', right: '32px', fontSize: '22px', padding: '12px 16px' }}>
        {slideNumber}/{totalSlides}
      </div>
      <div className="absolute font-bold opacity-70" style={{ top: '32px', left: '32px', fontSize: '28px' }}>
        {username}
      </div>
    </div>
  );
});

export default CarouselSlide;
