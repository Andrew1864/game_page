"use client";

import { Dispatch } from "@reduxjs/toolkit";
import {
  addClickedTech,
  removeClickedTech,
  setProgress,
  setAchievements,
} from "../slices/userSlice";
import BASE_URL from "./apiConfig";

interface LikeDislikeParams {
  type: "like" | "dislike";
  userId: number | string;
  clickedTechs: string[];
  dispatch: Dispatch;
  projectName: string;
  onAchievement: (isAdded: boolean) => void;
}

export const utilsHandleLikeDislike = async ({
  type,
  userId,
  clickedTechs,
  dispatch,
  projectName,
  onAchievement,
}: LikeDislikeParams) => {
  const likeKey = `${projectName}_like`;
  const dislikeKey = `${projectName}_dislike`;
  const techKey = type === "like" ? likeKey : dislikeKey;
  const oppositeKey = type === "like" ? dislikeKey : likeKey;
  const userIdStr = userId.toString();

  // Удаление лайка/дизлайка и минус очки
  if (clickedTechs.includes(techKey)) {
    try {
      const res = await fetch(
        `${BASE_URL}/likes?userId=${userIdStr}&project=${projectName}&type=${type}`
      );
      const likeData = await res.json();

      if (likeData.length > 0) {
        await fetch(`${BASE_URL}/likes/${likeData[0].id}`, {
          method: "DELETE",
        });
      }

      dispatch(removeClickedTech(techKey));
      onAchievement(false);

      // Уменьшаем прогресс и удаляем ачивку в базе
      const resUser = await fetch(`${BASE_URL}/users/${userIdStr}`);
      const user = await resUser.json();
      const updatedProgress = Math.max(user.progress - 10, 0);
      const updatedAchievements = user.achievements.filter(
        (ach: { title: string }) =>
          ach.title !== `Поставил лайк или дизлайк в ${projectName}`
      );

      await fetch(`${BASE_URL}/users/${userIdStr}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progress: updatedProgress,
          achievements: updatedAchievements,
        }),
      });

      // --- ФЕТЧИМ актуального пользователя ---
      const updatedUserRes = await fetch(`${BASE_URL}/users/${userIdStr}`);
      const updatedUser = await updatedUserRes.json();

      dispatch(setProgress(updatedUser.progress));
      dispatch(setAchievements(updatedUser.achievements));

      return "removed";
    } catch (error) {
      console.error("Ошибка при удалении лайка/дизлайка:", error);
      return "error";
    }
  }

  if (clickedTechs.includes(oppositeKey)) return "already-opposite";

  // Добавление лайка/дизлайка
  const newLike = {
    userId,
    project: projectName,
    type,
    date: new Date().toISOString(),
  };

  try {
    await fetch(`${BASE_URL}/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLike),
    });

    dispatch(addClickedTech(techKey));
    onAchievement(true);

    // (по желанию) — можно здесь тоже делать fetch пользователя, если меняются очки/ачивки
    return "added";
  } catch (error) {
    console.error("Ошибка при добавлении лайка/дизлайка:", error);
    return "error";
  }
};
