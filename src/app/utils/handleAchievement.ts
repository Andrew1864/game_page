"use client";

import { Dispatch } from "@reduxjs/toolkit";
import {
  setAchievements,
  addClickedTech,
  removeClickedTech,
  setProgress,
  showAlert,
} from "../slices/userSlice";

interface AchievementParams {
  userId: number;
  dispatch: Dispatch;
  context: string;
  mode: "visit" | "learn" | "action";
  isAdd: boolean;
  clickedTechs?: string[];
  autoClick?: boolean;
  showCustomAlert?: boolean;
}

const futureStackTitles = ["Vue.js", "Docker", "Backend"];

export const handleAchievement = async ({
  userId,
  dispatch,
  context,
  mode = "learn",
  isAdd,
  clickedTechs = [],
  autoClick = true,
  showCustomAlert = true,
}: AchievementParams) => {
  let achievementTitle = "";

  if (mode === "visit") {
    achievementTitle = `Зашёл в ${context}`;
  } else if (mode === "action") {
    achievementTitle = `Поставил лайк или дизлайк в ${context}`;
  } else if (mode === "learn" && futureStackTitles.includes(context)) {
    achievementTitle = `Изучил(а) ${context}`;
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

    // Гарантируем массив!
    const userAchievements = Array.isArray(user.achievements)
      ? user.achievements
      : [];
    let updatedAchievements = [];
    let updatedProgress = user.progress;

    if (isAdd) {
      const alreadyHasAchievement = userAchievements.some(
        (ach: { title: string }) => ach.title === achievementTitle
      );
      if (alreadyHasAchievement) return;

      updatedAchievements = [
        ...userAchievements,
        {
          title: achievementTitle,
          points: 10,
          date: new Date().toISOString(),
          completed: true,
        },
      ];
      updatedProgress += 10;
      if (showCustomAlert) {
        dispatch(
          showAlert({
            title: "Поздравляем!",
            subtitle: `Вы получили ачивку «${achievementTitle}» и +10 очков!`,
            variant: "success",
          })
        );
      }
    } else {
      updatedAchievements = userAchievements.filter(
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
