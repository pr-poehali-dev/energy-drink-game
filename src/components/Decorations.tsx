import React from 'react';

const Decorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Bubble particles */}
      <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-game-blue/10 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-12 h-12 rounded-full bg-game-red/10 animate-pulse delay-300"></div>
      <div className="absolute bottom-40 left-1/4 w-6 h-6 rounded-full bg-game-silver/10 animate-pulse delay-700"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 text-4xl opacity-10 rotate-12">🚀</div>
      <div className="absolute bottom-1/4 right-10 text-5xl opacity-10 -rotate-12">👆</div>
      <div className="absolute top-20 right-1/4 text-4xl opacity-10">⚡</div>
      
      {/* Grid patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-game-blue/5 blur-3xl"></div>
    </div>
  );
};

export default Decorations;
