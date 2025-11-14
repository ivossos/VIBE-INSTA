
import type { ColorPalette } from './types';

export const INTENTIONS: string[] = [
  'Informativo',
  'Inspirador',
  'Educacional',
  'Promocional',
  'Divertido',
  'Contar História'
];

export const COLOR_PALETTES: ColorPalette[] = [
  {
    name: 'Twilight',
    background: 'bg-gray-900',
    text: 'text-white',
    primary: 'bg-indigo-500',
    secondary: 'text-indigo-300',
    accent: 'border-indigo-500',
  },
  {
    name: 'Sunrise',
    background: 'bg-amber-50',
    text: 'text-gray-800',
    primary: 'bg-amber-500',
    secondary: 'text-amber-700',
    accent: 'border-amber-500',
  },
  {
    name: 'Ocean',
    background: 'bg-white',
    text: 'text-slate-800',
    primary: 'bg-sky-600',
    secondary: 'text-sky-800',
    accent: 'border-sky-600',
  },
  {
    name: 'Forest',
    background: 'bg-emerald-900',
    text: 'text-emerald-50',
    primary: 'bg-emerald-500',
    secondary: 'text-emerald-300',
    accent: 'border-emerald-500',
  },
  {
    name: 'Rose',
    background: 'bg-rose-50',
    text: 'text-rose-900',
    primary: 'bg-rose-500',
    secondary: 'text-rose-700',
    accent: 'border-rose-500',
  },
  {
    name: 'Minimalist',
    background: 'bg-zinc-100',
    text: 'text-zinc-900',
    primary: 'bg-black',
    secondary: 'text-zinc-600',
    accent: 'border-black',
  },
];
