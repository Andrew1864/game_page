import { Dispatch } from "@reduxjs/toolkit";
import {
  setAchievements,
  addClickedTech,
  removeClickedTech,
  setProgress,
} from "../slices/userSlice";

interface AchievementParams {
  userId: number;
  dispatch: Dispatch;
  setIsAlertOpen: (open: boolean) => void;
  context: string;
  mode: "visit" | "learn" | "action";
  isAdd: boolean;
  clickedTechs?: string[];
  autoClick?: boolean;
}

export const handleAchievement = async ({
  userId,
  dispatch,
  setIsAlertOpen,
  context,
  mode = "learn",
  isAdd,
  clickedTechs = [],
  autoClick = true,
}: AchievementParams) => {
  let achievementTitle = "";

  if (mode === "visit") {
    achievementTitle = `Зашёл в ${context}`;
  } else if (mode === "action") {
    achievementTitle = `Поставил лайк или дизлайк в ${context}`;
  } else {
    achievementTitle = `Узнал про ${context}`;
  }

  // Кликаем на технологию, если нужно
  if (autoClick && context && dispatch) {
    if (isAdd && !clickedTechs.includes(context)) {
      dispatch(addClickedTech(context));
    }
    if (!isAdd && clickedTechs.includes(context)) {
      dispatch(removeClickedTech(context));
    }
  }

  try {
    const res = await fetch(`http://localhost:3001/users/${userId}`);
    const user = await res.json();

    let updatedAchievements = [];
    let updatedProgress = user.progress;

    if (isAdd) {
      const alreadyHasAchievement = user.achievements.some(
        (ach: { title: string }) => ach.title === achievementTitle
      );
      if (alreadyHasAchievement) return;

      updatedAchievements = [
        ...user.achievements,
        {
          title: achievementTitle,
          points: 10,
          date: new Date().toISOString(),
          completed: true,
        },
      ];
      updatedProgress += 10;
      setIsAlertOpen(true);
    } else {
      // ❌ Больше НЕ вычитаем очки!
      updatedAchievements = user.achievements.filter(
        (ach: { title: string }) => ach.title !== achievementTitle
      );
      // Прогресс оставляем как есть!
    }

    await fetch(`http://localhost:3001/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress: updatedProgress,
        achievements: updatedAchievements,
      }),
    });

    dispatch(setAchievements(updatedAchievements));
    dispatch(setProgress(updatedProgress));
  } catch (error) {
    console.error("Ошибка обновления:", error);
  }
};
