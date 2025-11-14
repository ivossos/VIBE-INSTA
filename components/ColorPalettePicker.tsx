import React from 'react';
import type { ColorPalette } from '../types';

interface ColorPalettePickerProps {
  palettes: ColorPalette[];
  selected: ColorPalette;
  onSelect: (palette: ColorPalette) => void;
}

const ColorPalettePicker: React.FC<ColorPalettePickerProps> = ({ palettes, selected, onSelect }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
        3. Escolha sua Paleta de Cores
      </label>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {palettes.map((palette) => (
          <button
            key={palette.name}
            type="button"
            onClick={() => onSelect(palette)}
            className={`w-full p-2 rounded-lg border-2 transition-transform transform hover:scale-105 ${
              selected.name === palette.name ? `${palette.accent} ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-gray-800` : 'border-gray-300 dark:border-gray-600'
            }`}
            title={palette.name}
          >
            <div className="flex space-x-1 h-8 rounded-md overflow-hidden">
              <span className={`w-1/4 h-full ${palette.background}`}></span>
              <span className={`w-1/4 h-full ${palette.primary}`}></span>
              <span className={`w-1/4 h-full ${palette.secondary.replace('text-','bg-')}`}></span>
              <span className={`w-1/4 h-full ${palette.text.replace('text-','bg-')}`}></span>
            </div>
            <p className="text-xs text-center mt-2 font-medium text-gray-700 dark:text-gray-300">{palette.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPalettePicker;
