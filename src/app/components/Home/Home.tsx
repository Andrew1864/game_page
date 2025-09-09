"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NameInputModal from "../Modal/NameInputModal";
import ModalInfo from "../Modal/ModalInfo";
import FutureStack from "../FutureStack/FutureStack";
import { handleAchievement } from "@/app/utils/handleAchievement";
import BASE_URL from "@/app/utils/apiConfig";
import { addClickedTech } from "@/app/slices/userSlice";
import { RootState } from "@/app/slices/Store";
import Link from "next/link";

interface InfoItem {
  id: number;
  title: string;
  description: string;
  type: string;
}

const clueMessage = [
  "👋 Привет! Введи своё имя, и игра начнётся!",
  "👉 Исследуй сайт — кликай на технологии и проекты.",
  "🏆 Загляни в достижения — там ждут награды!",
  "💬 Оставь комментарий",
  "🚀 Готов? Давай начнём приключение!",
];

const HomeComponents: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTech, setSelectedTech] = useState<InfoItem | null>(null);
  const [infoData, setInfoData] = useState<InfoItem[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const userId = useSelector((state: RootState) => state.user.userId);
  const clickedTechs = useSelector(
    (state: RootState) => state.user.clickedTechs
  );
  const dispatch = useDispatch();

  // useEffect для сообщения
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        // Меняем индекс только ПОСЛЕ скрытия (через доп. задержку)
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % clueMessage.length);
        }, 700);
      }, 2500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Загружаем данные из db.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/info`);
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

  // Новый обработчик: открывает модалку и начисляет ачивку
  const handleTechInfoClick = async (item: InfoItem) => {
    setSelectedTech(item);
    if (userId) {
      await handleAchievement({
        userId,
        dispatch,
        context: item.title,
        mode: "learn",
        isAdd: true,
        clickedTechs,
      });
    }
  };

  // Старый обработчик: только для проектов
  const handleProjectClick = async (projectTitle: string) => {
    if (!userId) return;
    await handleAchievement({
      userId,
      dispatch,
      context: projectTitle,
      mode: "visit",
      isAdd: true,
      clickedTechs,
      showCustomAlert: false,
    });
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
            Превращаю идеи в цифровую реальность через код. Это портфолио —
            живое свидетельство моего пути в frontend-разработке, где каждый
            проект отражает освоение новых технологий и лучших практик.
          </p>
          <button
            onClick={handleOpenModal}
            className="mt-4  inline-block w-full px-8 py-3 border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer text-black"
          >
            <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-700"></span>
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
          <div
            className={`
             mt-6
             px-6 py-3 rounded-xl
             bg-[#23272f] 
             text-[#868580] 
             text-lg font-bold shadow 
            transition-opacity duration-700
             ${showMessage ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            style={{ minWidth: 260, textAlign: "center" }}
          >
            {clueMessage[messageIndex]}
          </div>
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
                onClick={() => handleTechInfoClick(item)}
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
          animation: marquee 20s linear infinite;
        }
      `}</style>
      <section className="w-full bg-white mt-2 max-w-full flex flex-col items-center gap-12 py-4">
        {/* Заголовок */}
        <h2 className="text-3xl font-bold text-gray-900 text-center w-full">
          Проекты
        </h2>
        {/* Проект 1 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 ">
          {/* Картинка с текстом */}
          <div className="w-full ml-3.5 md:w-1/2 h-80 rounded-xl shadow-lg overflow-hidden relative">
            <div
              style={{
                backgroundImage: "url('/program2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute inset-0 opacity-100"
            ></div>
            {/* Темный оверлей */}
            <div className="absolute inset-0 bg-[#272727]/60"></div>
            <h2 className="absolute inset-0 text-5xl sm:text-7xl md:text-9xl font-bold text-gray-300 uppercase flex items-center justify-center">
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
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-700"></span>
              <Link
                href="/InfoNews"
                onClick={() => {
                  handleProjectClick("InfoNews");
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
          <div className="w-full ml-3.5 md:w-1/2 h-80 rounded-xl shadow-lg overflow-hidden relative">
            <div
              style={{
                backgroundImage: "url('/program.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute inset-0 opacity-100"
            ></div>
            {/* Темный оверлей */}
            <div className="absolute inset-0 bg-[#272727]/60"></div>
            <h2 className="absolute inset-0 text-5xl sm:text-7xl md:text-9xl font-bold text-gray-300 uppercase flex items-center justify-center">
              MaryShop
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
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-700"></span>
              <Link
                href="/Maryshop"
                onClick={() => {
                  handleProjectClick("Maryshop");
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
          <div className="w-full ml-3.5 md:w-1/2 h-80 rounded-xl shadow-lg overflow-hidden relative">
            <div
              style={{
                backgroundImage: "url('/work.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute inset-0 opacity-100"
            ></div>
            {/* Темный оверлей */}
            <div className="absolute inset-0 bg-[#272727]/60"></div>
            <h2 className="absolute inset-0 text-5xl sm:text-7xl md:text-9xl font-bold text-gray-300 uppercase flex items-center justify-center">
              GreenPulse
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
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-700"></span>
              <Link
                href="/GreenPulse"
                onClick={() => {
                  handleProjectClick("Green_pulse");
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
      <section className="w-full max-w-[1260px] mx-auto py-3">
        <FutureStack />
      </section>
      <NameInputModal open={openModal} onClose={handleClose} />
      {selectedTech && (
        <ModalInfo
          key={selectedTech.title}
          title={selectedTech.title}
          description={selectedTech.description}
          onClose={handleClose}
        />
      )}
    </main>
  );
};

export default HomeComponents;
