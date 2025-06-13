"use client";

import { useState, useEffect } from "react";
import { RootState } from "@/app/slices/Store";
import {
  initializeFromLocalStorage,
  clearUserData,
} from "@/app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Header = () => {
  const [activePage, setActivePage] = useState("about");

  const dispatch = useDispatch();

  const hrName = useSelector((state: RootState) => state.user.name);

  // Восстанавливаем данные из localStorage при первой загрузке
  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearUserData());
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
        <a className="block text-black text-xl font-bold" href="#">
          My Portfolio
        </a>
        {/* Навигация */}
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
        {/* Имя HR */}
        <div className="ml-auto flex items-center gap-4">
          <span
            onClick={handleLogout}
            className="text-xl font-bold text-black cursor-pointer"
            title="Выйти из Аккаунта"
          >
            {hrName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
