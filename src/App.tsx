import React from 'react';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { ThemedApp } from './Theme';

function App() {
  return (
    <ThemedApp>
      <Header />
      <Content />
    </ThemedApp>
  );
}

export default App;
