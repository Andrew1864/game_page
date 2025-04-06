"use client";

import { useState } from "react";
import NameInputModal from "../Modal/NameInputModal";

const HomeComponents = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
            <span className="relative z-10 group-hover:text-white">Начать</span>
          </button>
        </div>
      </section>
      <section className="w-full py-10 rounded-xl  shadow-md overflow-hidden">
        <div className="w-full flex whitespace-nowrap overflow-hidden relative">
          <div className="flex space-x-4 cursor-pointer mr-1 animate-marquee">
            {[
              "ООП",
              "React",
              "Next.js",
              "TypeScript",
              "TailwindCSS",
              "Redux",
              "Material-ui",
              "JavaScripts",
              "Git",
              "Rest API",
              "HTML",
            ].map((item, index, arr) => (
              <p
                key={index}
                className="text-3xl font-bold text-gray-900 ml-1 hover:text-indigo-600 transition px-4"
              >
                {item} {index !== arr.length - 1 && " •"}
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
            <h2 className="text-5xl font-bold text-gray-600  uppercase">
              InfoNews
            </h2>
          </div>
          {/* Описание проекта */}
          <div className="w-full md:w-1/2 текст-центр md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">InfoNews</h1>
            <p className="mt-4 text-gray-600 text-lg">
              В этом проекте я получаю API. Там имеется погода, биржа и даже
              мини игра.
            </p>
            <button className="mt-4 inline-block px-8 py-3 border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer text-black">
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300"></span>
              <span className="relative z-10 group-hover:text-white">
                Посмотреть проект
              </span>
            </button>
          </div>
        </div>
        {/* Проект 2 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 mb-12">
          {/* Картинка с эффектом */}
          <div className="w-full ml-3.5 md:w-1/2 h-80 bg-[#272727] rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
            <h2 className="text-5xl font-bold text-gray-600  uppercase">
              Maryshop
            </h2>
          </div>
          {/* Описание проекта */}
          <div className="w-full md:w-1/2 текст-центр md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">Maryshop</h1>
            <p className="mt-4 text-gray-600 text-lg">
              В этом проекте реализовано - корзина товаров. Тут есть и
              регистрация, так же есть JSON-server. Добавление и удаление из
              корзины товаров.
            </p>
            <button className="mt-4 inline-block px-8 py-3 border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer text-black">
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300"></span>
              <span className="relative z-10 group-hover:text-white">
                Посмотреть проект
              </span>
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
          <div className="w-full md:w-1/2 текст-центр md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">Green_pulse</h1>
            <p className="mt-4 text-gray-600 text-lg">
              А в этом проекте, я с коллегой реализовываем информацию о
              загрязнение воздуха.
            </p>
            <button className="mt-4 inline-block px-8 py-3 border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer text-black">
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300"></span>
              <span className="relative з-10 group-hover:text-white">
                Посмотреть проект
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="w-full max-w-6xl py-20 flex flex-col md:flex-row items-start">
        {/* Левая часть с заголовком и описанием */}
        <div className="md:w-2/5 pr-8">
          <h2 className="text-4xl font-bold text-gray-900">Будущий стек.</h2>
          <p className="text-lg text-gray-600 mt-4">
            Я планирую освоить различные технологии, которые помогут мне
            развиваться как разработчику.
          </p>
        </div>
        {/* Правая часть с колонкой карточек */}
        <div className="md:w-3/5 flex flex-col gap-8 mt-8 md:mt-0">
          {/* Vue.js */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900">Vue.js</h3>
            <p className="text-gray-600 mt-2">
              Vue.js — это прогрессивный фреймворк для создания пользовательских
              интерфейсов с гибкой архитектурой.
            </p>
          </div>
          {/* Docker */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900">Docker</h3>
            <p className="text-gray-600 mt-2">
              Docker — это платформа, которая позволяет разработчикам
              упаковывать, отправлять и запускать приложения в контейнерах.
            </p>
          </div>
          {/* Backend */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900">Backend</h3>
            <p className="text-gray-600 mt-2">
              Бэкенд-разработка включает в себя серверную логику, базы данных и
              API, которые обеспечивают работу веб-приложений.
            </p>
          </div>
        </div>
      </section>
      <NameInputModal open={openModal} onClose={handleClose} />
    </main>
  );
};

export default HomeComponents;
