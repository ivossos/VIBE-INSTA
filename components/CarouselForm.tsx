
import React from 'react';
import type { ColorPalette } from '../types';
import { INTENTIONS, COLOR_PALETTES } from '../constants';
import ColorPalettePicker from './ColorPalettePicker';

interface CarouselFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  intention: string;
  setIntention: (intention: string) => void;
  username: string;
  setUsername: (username: string) => void;
  selectedPalette: ColorPalette;
  setSelectedPalette: (palette: ColorPalette) => void;
  generateImage: boolean;
  setGenerateImage: (generate: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const CarouselForm: React.FC<CarouselFormProps> = ({
  topic,
  setTopic,
  intention,
  setIntention,
  username,
  setUsername,
  selectedPalette,
  setSelectedPalette,
  generateImage,
  setGenerateImage,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label htmlFor="topic" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          1. Sobre o que é o seu carrossel?
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ex: 5 dicas para uma manhã produtiva"
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Seja específico para obter melhores resultados.</p>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          2. Seu nome de usuário do Instagram
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@seunome"
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Será exibido no canto superior esquerdo de cada slide.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            3. Gerar imagens com IA para os slides?
        </label>
        <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-300 dark:border-gray-600">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
                {generateImage ? 'Sim, gerar para todos os slides' : 'Não, usar apenas texto'}
            </span>
            <button
                type="button"
                onClick={() => setGenerateImage(!generateImage)}
                className={`${
                generateImage ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-500'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-gray-900`}
                role="switch"
                aria-checked={generateImage}
            >
                <span
                aria-hidden="true"
                className={`${
                    generateImage ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
            </button>
        </div>
      </div>

      <ColorPalettePicker
        palettes={COLOR_PALETTES}
        selected={selectedPalette}
        onSelect={setSelectedPalette}
      />

      <div>
        <label htmlFor="intention" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          5. Qual é a intenção do conteúdo?
        </label>
        <select
          id="intention"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          {INTENTIONS.map((int) => (
            <option key={int} value={int}>{int}</option>
          ))}
        </select>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out disabled:bg-indigo-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gerando...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Gerar Carrossel
          </>
        )}
      </button>
    </form>
  );
};

export default CarouselForm;
