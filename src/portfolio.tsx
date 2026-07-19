import React from 'react';
import { createRoot } from 'react-dom/client';
import PortfolioApp from './PortfolioApp';
import './portfolio.css';

const container = document.getElementById('portfolio-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <PortfolioApp />
    </React.StrictMode>
  );
}
