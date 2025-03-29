"use client";
import { useState } from "react";

const Header = () => {
  const [activePage, setActivePage] = useState("about");

  const menuItems = [
    { name: "Обо мне", id: "about" },
    { name: "Навыки", id: "skills" },
    { name: "Достижения", id: "achievements" },
    { name: "Проекты", id: "projects" },
    { name: "Контакты", id: "contact" },
  ];

  return (
    <header className="bg-white rounded-xl shadow-lg">
      <div className="mx-auto flex mt-2 h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Логотип */}
        <a className="block text-black text-xl font-bold" href="#">
          My Portfolio
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="relative group px-3 py-2 cursor-pointer"
                onClick={() => setActivePage(item.id)}
              >
                <span
                  className={`relative text-gray-600 transition-colors duration-300 ${
                    activePage === item.id ? "text-black" : "hover:text-black"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`absolute left-0 top-0 h-[2px] bg-black transition-all duration-300 ease-in-out ${
                    activePage === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
