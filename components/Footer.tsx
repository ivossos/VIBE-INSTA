
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 mt-8">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Gerador de Carrossel com IA. Todos os direitos reservados.</p>
        <p className="mt-1">Criado para inspirar e agilizar sua criação de conteúdo.</p>
      </div>
    </footer>
  );
};

export default Footer;
