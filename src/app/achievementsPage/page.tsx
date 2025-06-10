"use client";

import Link from "next/link";
import { RootState } from "@/app/slices/Store";
import { useSelector } from "react-redux";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AchievementCard from "../components/Card/AchievementCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const items = [
  { title: "Написал имя", subtitle: "Начни игру" },
  { title: "Узнал про ООП", subtitle: "Кликни по ООП" },
  { title: "Узнал про React", subtitle: "Кликни по React" },
  { title: "Узнал про Next.js", subtitle: "Кликни по Next.js" },
  {
    title: "Узнал про TypeScript",
    subtitle: "Кликни по TypeScript",
  },
  {
    title: "Узнал про TailwindCSS",
    subtitle: "Кликни по TailwindCSS",
  },
  { title: "Узнал про Redux", subtitle: "Кликни по Redux" },
  {
    title: "Узнал про Material-UI",
    subtitle: "Кликни по MaterialUi",
  },
  {
    title: "Узнал про JavaScript",
    subtitle: "Кликни по JavaScript",
  },
  { title: "Узнал про Git", subtitle: "Кликни по Git" },
  {
    title: "Узнал про RestAPI",
    subtitle: "Кликни по RestAPI",
  },
  { title: "Узнал про HTML", subtitle: "Кликни по HTML" },
  { title: "Зашёл в InfoNews", subtitle: "Зайди в InfoNews" },
  {
    title: "Поставил лайк или дизлайк в InfoNews",
    subtitle: "Поставить лайк или дизлайк в InfoNews",
  },
  { title: "Зашёл в Maryshop", subtitle: "Зайди в Maryshop" },
  {
    title: "Поставил лайк или дизлайк в Maryshop",
    subtitle: "Поставить лайк или дизлайк в Maryshop",
  },
  { title: "Зашёл в Green_pulse", subtitle: "Зайди в Green_pulse" },
  {
    title: "Поставил лайк или дизлайк в Green_pulse",
    subtitle: "Поставить лайк или дизлайк в Green_pulse",
  },
  { title: "Изучил(а) Vue.js", subtitle: "Узнать о Vue.js" },
  { title: "Изучил(а) Docker", subtitle: "Узнать про Docker" },
  { title: "Изучил(а) Backend", subtitle: "Узнать про Backend" },
  { title: "Комментарий", subtitle: "Написать комментарий" },
];

const AchievementsPage = () => {
  const hrName = useSelector((state: RootState) => state.user.name);
  const userAchievements = useSelector(
    (state: RootState) => state.user.achievements
  );

  const totalPoints = useSelector((state: RootState) => state.user.progress);

  const mergedItems = items.map((item) => ({
    ...item,
    completed: userAchievements.some((ach) => ach.title === item.title),
  }));

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start px-6 pt-6">
        <div className="w-full flex justify-start mb-6 pl-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-800 hover:text-blue-800 hover:underline transition"
          >
            <ArrowBackIcon className="w-6 h-6" />
            <span className="text-lg font-medium">Назад</span>
          </Link>
        </div>
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Имя:{" "}
              <span className="text-xl font-bold text-black">{hrName}</span>
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <StarPurple500Icon /> Твои достижения:
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <CelebrationIcon /> Твои очки за прохождение:
              {totalPoints}
            </p>
          </div>
        </div>
        <div className="w-full border-b border-gray-300 mt-6"></div>
        <h4 className="mb-2 text-2xl  font-extrabold">Список достижений.</h4>
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mergedItems.map((item, index) => (
            <AchievementCard
              key={index}
              title={item.title}
              description={item.subtitle}
              completed={item.completed}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AchievementsPage;
