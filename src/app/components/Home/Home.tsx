"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NameInputModal from "../Modal/NameInputModal";
import ModalInfo from "../Modal/ModalInfo";
import Alert from "../Alert/Alert";
import FutureStack from "../FutureStack/FutureStack";
import {
  setAchievements,
  setProgress,
  addClickedTech,
  updateAchievements,
} from "@/app/slices/userSlice";
import { RootState } from "@/app/slices/Store";
import Link from "next/link";

interface InfoItem {
  id: number;
  title: string;
  description: string;
  type: string;
}

const HomeComponents: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [selectedTech, setSelectedTech] = useState<InfoItem | null>(null);
  const [infoData, setInfoData] = useState<InfoItem[]>([]);
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.user.userId); // Получаем userId из Redux для проверки регистрации
  const clickedTechs = useSelector(
    (state: RootState) => state.user.clickedTechs
  ); // Получаем список нажатых технологий из Redux

  // Загружаем данные из db.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/info");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data: InfoItem[] = await res.json();
        if (data && Array.isArray(data)) {
          setInfoData(data); // Сохраняем данные в состоянии
        } else {
          console.error("Ошибка: данные не являются массивом.");
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmitClick = async (techTitle: string) => {
    let achievementTitle;

    if (
      techTitle === "InfoNews" ||
      techTitle === "Maryshop" ||
      techTitle === "Green_pulse"
    ) {
      achievementTitle = `Зашёл в ${techTitle}`;
    } else {
      achievementTitle = `Узнал про ${techTitle}`;
    }

    const newAchievement = {
      title: achievementTitle,
      points: 10,
      date: new Date().toISOString(),
      completed: true,
    };

    if (userId) {
      try {
        const res = await fetch(`http://localhost:3001/users/${userId}`);
        const user = await res.json();

        const updatedAchievements = [...user.achievements, newAchievement];

        // Отправляем обновления на сервер
        await fetch(`http://localhost:3001/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            progress: user.progress + 10,
            achievements: updatedAchievements,
          }),
        });

        // Обновляем Redux Store
        dispatch(setAchievements(updatedAchievements)); // Обновляем весь список достижений
        dispatch(setProgress(user.progress + 10)); // Обновляем прогресс
        setIsAlertOpen(true);
      } catch (error) {
        console.error("Ошибка обновления:", error);
      }
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    if (!clickedTechs.includes("Начать")) {
      dispatch(addClickedTech("Начать"));
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedTech(null);
  };

  const handleTechClick = (techTitle: string) => {
    const selected = infoData.find((item) => item.title === techTitle);
    if (selected) {
      setSelectedTech(selected); // Устанавливаем выбранный элемент
      handleSubmitClick(techTitle); // сохраняем ачивку
      dispatch(addClickedTech(techTitle)); // Добавляем технологию в Redux
    } else {
      console.error(`Элемент с названием "${techTitle}" не найден.`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 py-20">
        {/* Image */}
        <div className="w-full ml-3.5 md:w-1/2 h-80 bg-white rounded-xl shadow-lg overflow-hidden group">
          <div
            className="h-full w-full bg-cover bg-center group-hover:filter-none filter grayscale transition-all duration-300"
            style={{
              backgroundImage: "url('/work.jpg')",
            }}
          ></div>
        </div>
        {/* Info */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">Андрей</h1>
          <p className="mt-4 text-gray-600 text-lg">
            Начинающий программист, Frontend-разработчик. Этот проект моё
            портфолио. Тут я показываю чему я смог научиться.
          </p>
          <button
            onClick={handleOpenModal}
            className="mt-4 inline-block w-full px-8 py-3 border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer text-black"
          >
            <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300"></span>
            <span
              className={`relative z-10  ${
                userId && clickedTechs.includes("Начать")
                  ? "text-green-600"
                  : "group-hover:text-white"
              }`}
            >
              Начать
            </span>
          </button>
        </div>
      </section>
      {/* Технологии */}
      <section className="w-full py-10 rounded-xl shadow-md overflow-hidden">
        <div className="w-full flex whitespace-nowrap overflow-hidden relative">
          <div className="flex space-x-4 cursor-pointer mr-1 animate-marquee">
            {infoData.map((item) => (
              <p
                key={item.id}
                className={`text-3xl font-bold ml-1 transition px-4 ${
                  userId && clickedTechs.includes(item.title)
                    ? "text-green-600"
                    : "text-gray-900 hover:text-indigo-600"
                }`}
                onClick={() => handleTechClick(item.title)}
              >
                {item.title}
              </p>
            ))}
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
      <section className="w-full bg-white mt-2 max-w-full flex flex-col items-center gap-12 py-20">
        {/* Заголовок */}
        <h2 className="text-3xl font-bold text-gray-900 text-center w-full mb-12">
          Проекты
        </h2>
        {/* Проект 1 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 mb-12">
          {/* Картинка с текстом */}
          <div className="w-full ml-3.5 md:w-1/2 h-80 bg-[#272727] rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
            <h2 className="text-5xl font-bold text-gray-600 uppercase">
              InfoNews
            </h2>
          </div>
          {/* Описание проекта */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl  font-bold text-gray-900">InfoNews</h1>
            <p className="mt-4 text-gray-600 text-lg">
              В этом проекте я получаю API. Там имеется погода, биржа и даже
              мини игра.
            </p>
            <button className="mt-4 inline-block px-8 py-3 border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer text-black">
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300"></span>
              <Link
                href="/InfoNews"
                onClick={() => {
                  handleSubmitClick("InfoNews");
                }}
                className={`relative z-10 ${
                  clickedTechs.includes("InfoNews")
                    ? "text-green-600"
                    : "group-hover:text-white"
                }`}
              >
                Посмотреть проект
              </Link>
            </button>
          </div>
        </div>
        {/* Проект 2 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 mb-12">
          {/* Картинка с эффектом */}
          <div className="w-full ml-3.5 md:w-1/2 h-80 bg-[#272727] rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
            <h2 className="text-5xl font-bold text-gray-600 uppercase">
              Maryshop
            </h2>
          </div>
          {/* Описание проекта */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">Maryshop</h1>
            <p className="mt-4 text-gray-600 text-lg">
              В этом проекте реализовано - корзина товаров. Тут есть и
              регистрация, так же есть JSON-server. Добавление и удаление из
              корзины товаров.
            </p>
            <button className="mt-4 inline-block px-8 py-3 border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer text-black">
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300"></span>
              <Link
                href="/Maryshop"
                onClick={() => {
                  handleSubmitClick("Maryshop");
                }}
                className={`relative z-10 ${
                  clickedTechs.includes("Maryshop")
                    ? "text-green-600"
                    : "group-hover:text-white"
                }`}
              >
                Посмотреть проект
              </Link>
            </button>
          </div>
        </div>
        {/* Проект 3 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 mb-12">
          {/* Картинка с эффектом */}
          <div className="w-full ml-3.5 md:w-1/2 h-80 bg-[#272727] rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
            <h2 className="text-5xl font-bold text-gray-600 uppercase">
              Green_pulse
            </h2>
          </div>
          {/* Описание проекта */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">Green_pulse</h1>
            <p className="mt-4 text-gray-600 text-lg">
              А в этом проекте, я с коллегой реализовываем информацию о
              загрязнение воздуха.
            </p>
            <button className="mt-4 inline-block px-8 py-3 border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer text-black">
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300"></span>
              <Link
                href="/GreenPulse"
                onClick={() => {
                  handleSubmitClick("Green_pulse");
                }}
                className={`relative z-10 ${
                  clickedTechs.includes("Green_pulse")
                    ? "text-green-600"
                    : "group-hover:text-white"
                }`}
              >
                Посмотреть проект
              </Link>
            </button>
          </div>
        </div>
      </section>
      <section className="w-full max-w-[1260px] mx-auto py-20">
        <FutureStack />
      </section>
      <NameInputModal open={openModal} onClose={handleClose} />
      {selectedTech && (
        <ModalInfo
          title={selectedTech.title}
          description={selectedTech.description}
          onClose={handleClose}
        />
      )}
      <Alert
        variant="success"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Поздравляем!"
        subtitle="Вы получили ачивку и +10 очков! "
      />
    </main>
  );
};

export default HomeComponents;
