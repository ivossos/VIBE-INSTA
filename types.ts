export interface ColorPalette {
  name: string;
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}

export interface CarouselSlideData {
  title: string;
  content: string;
  slide_type: 'cover' | 'content' | 'cta';
  imageUrl?: string;
}

export interface CarouselFormData {
  topic: string;
  intent: string;
  username: string;
}
