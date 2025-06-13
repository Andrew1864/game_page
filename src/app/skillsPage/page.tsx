"use client";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../slices/Store";
import CardForTest from "../components/Card/CardForTest";
import SuccessModal from "../components/Modal/SuccessModal";

interface QuizType {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const SkillsPage = () => {
  const [tests, setTests] = useState<QuizType[]>([]);
  const hrName = useSelector((state: RootState) => state.user.name);
  // TODO: заменить на реальные значения, когда будут
  const correctCount = 0;
  const wrongCount = 0;
  const timer = "00:00";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/quiz");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Тут сервер вернёт именно массив тестов
        const data: QuizType[] = await response.json();
        console.log("quiz data from server", data); // <- тут увидишь массив объектов
        setTests(data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      {/* Header Section */}
      <div className="w-full max-w-4xl flex flex-row items-center justify-between bg-white rounded-xl shadow-md py-6 px-8 mb-6">
        {/* Левая часть: имя и ответы */}
        <div className="flex flex-col gap-1">
          <div className="text-lg font-bold text-gray-800">
            Имя: <span className="font-bold text-black">{hrName}</span>
          </div>
          <div className="flex gap-4 mt-1 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <ThumbUpAltIcon fontSize="small" /> Правильные: {correctCount}
            </span>
            <span className="flex items-center gap-1 text-red-600">
              <ThumbDownOffAltIcon fontSize="small" /> Ошибки: {wrongCount}
            </span>
          </div>
        </div>
        {/* Правая часть: кнопка + таймер */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none
             hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-6 py-2 transition"
          >
            Начать
          </button>
          <div className="text-xl font-mono text-gray-700 border rounded-lg px-4 py-2 bg-gray-100">
            {timer}
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl border-b border-gray-300 mb-6" />
      <main className="w-full max-w-4xl flex flex-col gap-4" id="mainSection">
        {/* Здесь будут карточки с тестами */}
        {tests.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            Тесты появятся здесь
          </div>
        ) : (
          tests.map((test) => (
            <CardForTest
              key={test.id}
              question={test.question}
              answers={test.options.map((option, idx) => ({
                text: option,
                isCorrect: idx === test.correctIndex,
              }))}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default SkillsPage;
