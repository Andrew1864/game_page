"use client";
import { RootState } from "@/app/slices/Store";
import { useSelector } from "react-redux";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AchievementCard from "../components/Card/AchievementCard";

const items = [
  { title: "Написал имя", subtitle: "Начни игру", completed: false },
  { title: "Узнал про ООП", subtitle: "Кликни по ООП", completed: false },
  { title: "Узнал про React", subtitle: "Кликни по React", completed: false },
  { title: "Узнал про Next", subtitle: "Кликни по Next", completed: false },
  {
    title: "Узнал про TypeScripts",
    subtitle: "Кликни по TypeScripts",
    completed: false,
  },
  {
    title: "Узнал про TailwindSCC",
    subtitle: "Кликни по TailwindSCC",
    completed: false,
  },
  { title: "Узнал про Redux", subtitle: "Кликни по Redux", completed: false },
  {
    title: "Узнал про MaterialUi",
    subtitle: "Кликни по MaterialUi",
    completed: false,
  },
  {
    title: "Узнал про JavaScripts",
    subtitle: "Кликни по JavaScripts",
    completed: false,
  },
  { title: "Узнал про Git", subtitle: "Кликни по Git", completed: false },
  {
    title: "Узнал про Rest API",
    subtitle: "Кликни по Rest API",
    completed: false,
  },
  { title: "Узнал про HTML", subtitle: "Кликни по HTML", completed: false },
  { title: "InfoNews", subtitle: "Зайди в InfoNews", completed: false },
  { title: "Maryshop", subtitle: "Зайди Maryshop", completed: false },
  { title: "Green_pulse", subtitle: "Зайди Green_pulse", completed: false },
  { title: "Комментарий", subtitle: "Написать комментарий", completed: false },
];

const AchievementsPage = () => {
  const hrName = useSelector((state: RootState) => state.user.name);
  const achievements = useSelector(
    (state: RootState) => state.user.achievements
  );
  const totalPoints = achievements.filter((e) => e.completed).length * 10;

  const mergedItems = items.map((item) => {
    const achievement = achievements.find((a) => a.title === item.title);
    return {
      ...item,
      completed: achievement ? achievement.completed : false,
    };
  });

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start px-6 pt-6">
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
        <h4 className="mb-2 text-2xl font-bold">Список достижений.</h4>
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
