
import React from 'react';
import Header from './components/Header';
import AuthenticityChecker from './components/AuthenticityChecker';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AuthenticityChecker />
      </main>
    </div>
  );
}

export default App;
