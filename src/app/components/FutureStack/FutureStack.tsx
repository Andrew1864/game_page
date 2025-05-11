"use client";

import { useState } from "react";

const stacks = [
  { title: "Vue.js", description: "Прогрессивный фреймворк для создания UI" },
  { title: "Docker", description: "Контейнеризация приложений для dev/prod" },
  { title: "Backend", description: "Node.js, Express, базы данных и API" },
];

const FutureStack = () => {
  const [activeStack, setActiveStack] = useState<number | null>(null);

  return (
    <section className="w-full max-w-[1260px] mx-auto  relative z-0">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Будущий стек для изучения.
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {stacks.map((stack, index) => (
          <div
            key={index}
            onClick={() => setActiveStack(index)}
            className="w-[380px] h-[200px] bg-[#1f1f1f] rounded-2xl shadow-lg flex items-center justify-center text-xl text-white font-semibold cursor-pointer hover:scale-105 transition-transform"
          >
            {stack.title}
          </div>
        ))}
      </div>

      {activeStack !== null && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/5 flex items-center justify-center z-50"
          onClick={() => setActiveStack(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[400px] min-h-[250px] bg-[#2b2b2b] rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white text-center px-6 relative animate-fade-in"
          >
            <h3 className="text-2xl font-bold mb-4">
              {stacks[activeStack].title}
            </h3>
            <p className="text-base">{stacks[activeStack].description}</p>

            <button
              onClick={() => setActiveStack(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FutureStack;
