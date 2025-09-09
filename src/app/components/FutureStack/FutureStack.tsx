"use client";

import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/slices/Store";
import { addClickedTech } from "@/app/slices/userSlice";
import { handleAchievement } from "@/app/utils/handleAchievement";

const stacks = [
  {
    title: "Vue.js",
    description:
      "Изучение Vue.js позволяет расширить мой технический стек и понимание экосистемы современных фронтенд-фреймворков.Это ценный навык для создания гибких и гибких и производительных веб-приложений",
  },
  {
    title: "Docker",
    description:
      "Изучение Docker — это следующий шаг в моем профессиональном развитии.  Он позволит мне освоить современные подходы к containerization,  что является must-have навыком для full-stack разработчика.",
  },
  {
    title: "Backend",
    description:
      "Изучение Backend — это ключевой этап моего становления как full-stack разработчика. Это позволит мне понимать полный цикл разработки от клиента до сервера и баз данных.",
  },
];

const motivationalMessages = [
  "Проверь свои знания!",
  "HR, не забудь испытать себя в тестах!",
  "Время обновить свои навыки!",
];

const FutureStack = () => {
  const [activeStack, setActiveStack] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userId);
  const clickedTechs = useSelector(
    (state: RootState) => state.user.clickedTechs
  );
  const achievements = useSelector(
    (state: RootState) => state.user.achievements
  );

  useEffect(() => {
    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const cycle = () => {
      setShowMessage(true);
      showTimeout = setTimeout(() => {
        setShowMessage(false);
        hideTimeout = setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
          cycle();
        }, 3000);
      }, 3000);
    };

    cycle();
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  const handleStackClick = useCallback(
    async (title: string) => {
      if (!userId) return;

      const achievementsSafe = Array.isArray(achievements) ? achievements : [];

      const hasAchievement = achievementsSafe.some(
        (ach) => ach.title === `Изучил(а) ${title}`
      );

      if (!hasAchievement) {
        await handleAchievement({
          userId,
          dispatch,
          context: title,
          mode: "learn",
          isAdd: true,
          clickedTechs,
        });
      }
      if (!clickedTechs.includes(title)) {
        dispatch(addClickedTech(title));
      }
    },
    [userId, achievements, clickedTechs, dispatch]
  );

  return (
    <section className="w-full max-w-[1260px] mx-auto relative z-0">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Будущий стек для изучения.
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {stacks.map((stack, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveStack(index);
              handleStackClick(stack.title);
            }}
            className={`w-[380px] h-[200px] bg-[#1f1f1f] rounded-2xl shadow-lg flex items-center justify-center text-xl font-semibold cursor-pointer hover:scale-105 transition-transform ${
              clickedTechs.includes(stack.title)
                ? "text-green-600"
                : "text-white group-hover:text-white"
            }`}
          >
            {stack.title}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 min-h-[40px]">
        <div
          className={`
            px-6 py-3 rounded-xl 
            bg-[#23272f] 
            text-[#ffe066] 
            text-lg font-bold shadow 
            transition-opacity duration-700
            ${showMessage ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          style={{ minWidth: 260, textAlign: "center" }}
        >
          {motivationalMessages[messageIndex]}
        </div>
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
              className="absolute top-4 right-4 text-white text-2xl hover:scale-110 cursor-pointer"
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
