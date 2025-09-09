"use client";

import { useState, useEffect } from "react";
import { RootState } from "@/app/slices/Store";
import {
  initializeFromLocalStorage,
  clearUserData,
} from "@/app/slices/userSlice";
import { resetQuiz } from "@/app/slices/quizSlice";
import { persistor } from "@/app/slices/Store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Header = () => {
  const [activePage, setActivePage] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const hrName = useSelector((state: RootState) => state.user.name);

  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, [dispatch]);

  const handleLogout = () => {
    router.push("/");
    setTimeout(() => {
      dispatch(clearUserData());
      dispatch(resetQuiz());
      persistor.purge();
    }, 300);
  };

  const handleNavigation = (id: string) => {
    setActivePage(id);
    setIsMobileMenuOpen(false); // Закрываем меню после клика на мобильном устройстве
  };

  const menuItems = [
    { name: "Обо мне", id: "about", href: "/" },
    { name: "Навыки", id: "skills", href: "/skillsPage" },
    { name: "Достижения", id: "achievements", href: "/achievementsPage" },
    { name: "Контакты", id: "contact", href: "/contactPage" },
  ];

  return (
    <header className="bg-white rounded-xl shadow-lg">
      <div className="mx-auto flex mt-2 h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Логотип */}
        <a
          className="block text-2xl font-light font-serif italic tracking-wide text-black hover:text-gray-600 transition-colors"
          href="/"
        >
          Моё Портфолио
        </a>
        {/* Кнопка мобильного меню */}
        <button
          className="block md:hidden ml-auto p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Открыть меню"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {/* Десктопная навигация */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="relative group px-3 py-2 cursor-pointer"
                onClick={() => setActivePage(item.id)}
              >
                <Link href={item.href}>
                  <span
                    className={`relative text-gray-600 transition-colors duration-300 ${
                      activePage === item.id ? "text-black" : "hover:text-black"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
                <span
                  className={`absolute left-0 top-0 h-[2px] bg-black transition-all duration-300 ease-in-out ${
                    activePage === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </nav>
        {/* Мобильное меню (появляется при клике) */}
        {isMobileMenuOpen && (
          <div className="absolute md:hidden top-14 left-0 right-0 bg-white shadow-lg rounded-b-xl z-50">
            <nav className="px-4 py-3">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href}>
                      <div
                        className={`block px-3 py-2 rounded-md transition-colors duration-300 ${
                          activePage === item.id
                            ? "bg-gray-100 text-black font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-black"
                        }`}
                        onClick={() => handleNavigation(item.id)}
                      >
                        {item.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
        {/* Имя HR */}
        <div className="hidden md:flex ml-auto items-center gap-4">
          <span
            onClick={handleLogout}
            className="text-xl font-bold text-black cursor-pointer"
            title="Выйти из Аккаунта"
          >
            {hrName}
          </span>
        </div>
        {/* Имя HR в мобильном меню */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              {/* <span className="text-gray-600">Вы вошли как:</span> */}
              <span
                onClick={handleLogout}
                className="text-lg font-bold text-black cursor-pointer"
                title="Выйти из Аккаунта"
              >
                {hrName}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
