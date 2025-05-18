
const Intro = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 overflow-hidden px-4">
      <div className="text-center space-y-4">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 animate-pulse drop-shadow-lg">
          SAILENDRAZ
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-lg lg:text-xl text-slate-300 font-medium tracking-widest italic animate-fade-in opacity-80">
          — your modern <span className="text-indigo-300">Markdown Editor</span>
        </p>
      </div>
    </div>
  );
};

export default Intro;
