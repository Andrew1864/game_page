"use client";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../slices/Store";
import {
  nextQuestion,
  finishQuiz,
  setAnswer,
  resetQuiz,
} from "../slices/quizSlice";
import { handleAchievement } from "../utils/handleAchievement";
import BASE_URL from "../utils/apiConfig";
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
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isReplay, setIsReplay] = useState(false);

  // --- REDUX STATE ---
  const userId = useSelector((state: RootState) => state.user.userId); // id пользователя
  const userName = useSelector((state: RootState) => state.user.name); // имя пользователя
  const achievements = useSelector(
    (state: RootState) => state.user.achievements
  ); // достижения пользователя
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.quiz.currentStep); // номер текущего вопроса
  const isFinished = useSelector((state: RootState) => state.quiz.isFinished); // завершён ли квиз
  const selectedAnswer = useSelector(
    (state: RootState) => state.quiz.selectedAnswer
  ); // массив выбранных ответов

  if (!userName || !userId) {
    return (
      <div className="text-center mt-20 p-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Добро пожаловать!
        </h3>
        <p className="text-gray-600">
          Пожалуйста, введите ваше имя, чтобы начать тестирование
        </p>
      </div>
    );
  }

  // --- Побочный эффект: загрузка вопросов с сервера при монтировании страницы ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quiz`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data: QuizType[] = await response.json();
        setTests(data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    fetchData();
  }, []);

  // --- Побочный эффект: запуск и остановка таймера при начале и завершении квиза --
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (started && !isFinished) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [started, isFinished]);

  // --- Вспомогательная функция для форматирования времени (мм:сс) ---
  const formatTime = (totalSecond: number) => {
    const minutes = Math.floor(totalSecond / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSecond % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // --- Подсчёт количества правильных и неправильных ответов ---
  const correctCount = tests.reduce(
    (acc, test, idx) =>
      selectedAnswer[idx] === test.correctIndex ? acc + 1 : acc,
    0
  );
  const wrongCount = tests.length - correctCount;

  // функция для повторной игры без начисления очков
  const handleAgainStart = () => {
    if (isFinished) {
      dispatch(resetQuiz());
      setStarted(true);
      setSeconds(0);
      setIsReplay(true);
    }
  };

  /**
   * Завершить квиз:
   * - отправляет экшен finishQuiz (для сохранения результата)
   * - начисляет ачивку и очки, если все ответы правильные
   * - начисляет только очки за попытку, если были ошибки
   * - открывает модальное окно с результатом
   */
  const handleFinish = () => {
    dispatch(finishQuiz({ current: correctCount, incurrent: wrongCount }));

    const achievementsSafe = Array.isArray(achievements) ? achievements : [];
    const hasAchievement = achievementsSafe.some(
      (ach) => ach.title === "Пройден мини-квиз"
    );

    if (!isReplay) {
      if (correctCount === tests.length && userId !== null && !hasAchievement) {
        // Все ответы верны и ачивки ещё нет — даём ачивку и 50 очков
        handleAchievement({
          userId: userId,
          dispatch,
          context: "мини-квиз",
          mode: "quiz",
          isAdd: true,
        });
      } else if (userId !== null) {
        // Есть ошибки — даём только 10 очков за попытку (ачивка не начисляется)
        handleAchievement({
          userId: userId,
          dispatch,
          context: "Попытка мини-квиз",
          mode: "quizAttempt",
          isAdd: true,
          showCustomAlert: true,
        });
      }
      setIsReplay(true);
    }
    setModalOpen(true);
  };

  // --- Флаг, что тест реально начат и есть вопросы ---
  const quizStarted = started && tests.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      {/* Верхняя панель */}
      <div className="w-full max-w-4xl flex flex-row items-center justify-between bg-white rounded-xl shadow-md py-6 px-8 mb-6">
        <div className="flex flex-col gap-1">
          <div className="text-lg font-bold text-gray-800">
            Имя: <span className="font-bold text-black">{userName}</span>
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
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-6 py-2 transition cursor-pointer"
            onClick={handleAgainStart}
          >
            Начать заново
          </button>
          {!started && (
            <button
              type="button"
              disabled={isFinished}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-6 py-2 transition cursor-pointer"
              onClick={() => {
                setStarted(true);
                setSeconds(0);
              }}
            >
              Начать
            </button>
          )}
          <div className="text-xl font-mono text-gray-700 border rounded-lg px-4 py-2 bg-gray-100">
            {formatTime(seconds)}
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl border-b border-gray-300 mb-6" />

      {/* Основная часть */}
      <main className="w-full max-w-4xl flex flex-col items-center gap-6">
        {!started ? (
          <div className="text-center text-gray-400 py-12">
            Нажмите "Начать", чтобы увидеть тесты
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            Загрузка тестов...
          </div>
        ) : (
          <>
            <div className="w-full flex justify-center">
              <CardForTest
                question={tests[currentStep].question}
                answers={tests[currentStep].options.map((option, idx) => ({
                  text: option,
                  isCorrect: idx === tests[currentStep].correctIndex,
                }))}
                selected={selectedAnswer[currentStep] ?? null}
                onSelect={(idx) => dispatch(setAnswer(idx))}
              />
            </div>
            <div className="flex justify-center mt-4">
              {currentStep + 1 < tests.length ? (
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer"
                  onClick={() => dispatch(nextQuestion())}
                >
                  Далее
                </button>
              ) : (
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg cursor-pointer"
                  disabled={isFinished}
                  onClick={handleFinish}
                >
                  Завершить
                </button>
              )}
            </div>
          </>
        )}
      </main>
      <SuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isSuccess={correctCount === tests.length}
        title={
          correctCount === tests.length
            ? "Поздравляем с прохождением теста!"
            : "Тест завершён"
        }
        description={
          correctCount === tests.length
            ? `Вы ответили правильно на все вопросы!`
            : `Вы ответили правильно на ${correctCount} из ${tests.length} вопросов. Попробуйте снова!`
        }
      />
    </div>
  );
};

export default SkillsPage;
