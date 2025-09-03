"use client";

import { Dispatch } from "@reduxjs/toolkit";
import {
  setAchievements,
  addClickedTech,
  removeClickedTech,
  setProgress,
  showAlert,
} from "../slices/userSlice";
import BASE_URL from "./apiConfig";

// Добавлен новый режим ачивки "comment" для комментариев пользователя.
// Теперь AchievementParams поддерживает mode: "visit" | "learn" | "action" | "comment".
interface AchievementParams {
  userId: number | string;
  dispatch: Dispatch;
  context: string;
  mode: "visit" | "learn" | "action" | "comment" | "quiz" | "quizAttempt";
  isAdd: boolean;
  clickedTechs?: string[];
  autoClick?: boolean;
  showCustomAlert?: boolean;
}

// Массив будущих технологий для режима "learn"
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

  // Определяем заголовок ачивки по выбранному режиму
  if (mode === "visit") {
    achievementTitle = `Зашёл в ${context}`;
  } else if (mode === "action") {
    achievementTitle = `Поставил лайк или дизлайк в ${context}`;
  } else if (mode === "comment") {
    achievementTitle = `Написал комментарий`;
  } else if (mode === "quiz") {
    achievementTitle = "Пройден мини-квиз";
  } else if (mode === "quizAttempt") {
    achievementTitle = ""; // Не даём ачивку, только очки и алерт
  } else if (mode === "learn" && futureStackTitles.includes(context)) {
    achievementTitle = `Изучил(а) ${context}`;
  } else {
    achievementTitle = `Узнал про ${context}`;
  }

  // Управление кликами по технологиям (для других режимов)
  if (autoClick && context && dispatch) {
    if (isAdd && !clickedTechs.includes(context)) {
      dispatch(addClickedTech(context));
    }
    if (!isAdd && clickedTechs.includes(context)) {
      dispatch(removeClickedTech(context));
    }
  }

  try {
    // Получаем пользователя с сервера
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    const user = await res.json();

    // Гарантируем, что achievements — массив
    const userAchievements = Array.isArray(user.achievements)
      ? user.achievements
      : [];
    let updatedAchievements = [];
    let updatedProgress = user.progress;

    if (isAdd) {
      // Проверяем, есть ли уже такая ачивка
      const alreadyHasAchievement = userAchievements.some(
        (ach: { title: string }) => ach.title === achievementTitle
      );
      if (alreadyHasAchievement) return;

      let points = 10;
      if (mode === "quiz") {
        points = 50;
      }

      // Добавляем новую ачивку
      if (mode === "quizAttempt") {
        updatedAchievements = userAchievements; // не добавлять ачивку
      } else {
        // обычная логика добавления ачивки
        updatedAchievements = [
          ...userAchievements,
          {
            title: achievementTitle,
            points,
            date: new Date().toISOString(),
            completed: true,
          },
        ];
      }
      updatedProgress += points;
      // Показываем алерт только если нужно
      if (showCustomAlert) {
        if (mode === "quiz") {
          dispatch(
            showAlert({
              title: "Поздравляем!",
              subtitle: `Вы получили ачивку «${achievementTitle}» и +${points} очков!`,
              variant: "success",
            })
          );
        } else if (mode === "quizAttempt") {
          dispatch(
            showAlert({
              title: "Попробуйте ещё раз!",
              subtitle: `+${points} очков за попытку пройти мини-квиз!`,
              variant: "info",
            })
          );
        } else {
          // Для остальных режимов — свой алерт
          dispatch(
            showAlert({
              title: "Достижение!",
              subtitle: `Вы получили ачивку «${achievementTitle}» и +${points} очков!`,
              variant: "success",
            })
          );
        }
      }
    } else {
      // Удаляем ачивку, если isAdd === false
      updatedAchievements = userAchievements.filter(
        (ach: { title: string }) => ach.title !== achievementTitle
      );
      // Прогресс не меняем
    }

    // Сохраняем изменения пользователя на сервер
    await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress: updatedProgress,
        achievements: updatedAchievements,
      }),
    });

    // Обновляем состояние Redux
    dispatch(setAchievements(updatedAchievements));
    dispatch(setProgress(updatedProgress));
  } catch (error) {
    console.error("Ошибка обновления:", error);
  }
};
