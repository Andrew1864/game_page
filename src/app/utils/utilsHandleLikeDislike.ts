import { Dispatch } from "@reduxjs/toolkit";
import {
  addClickedTech,
  removeClickedTech,
  setAchievements,
  setProgress,
} from "../slices/userSlice";

interface LikeDislikeParams {
  type: "like" | "dislike";
  userId: number | string;
  clickedTechs: string[];
  dispatch: Dispatch;
  projectName: string;
  onAchievement: () => void;
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

  if (clickedTechs.includes(techKey)) {
    try {
      const res = await fetch(
        `http://localhost:3001/likes?userId=${userIdStr}&project=${projectName}&type=${type}`
      );

      const likeData = await res.json();

      if (likeData.length > 0) {
        await fetch(`http://localhost:3001/likes/${likeData[0].id}`, {
          method: "DELETE",
        });
      }

      dispatch(removeClickedTech(techKey));
      return "removed"; // вернуть статус
    } catch (error) {
      console.error("Ошибка при удалении лайка/дизлайка:", error);
      return "error";
    }
  }

  if (clickedTechs.includes(oppositeKey)) return "already-opposite";

  const newLike = {
    userId,
    project: projectName,
    type,
    date: new Date().toISOString(),
  };

  try {
    await fetch("http://localhost:3001/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLike),
    });

    dispatch(addClickedTech(techKey));
    onAchievement(); // коллбэк для сохранения ачивки
    return "added";
  } catch (error) {
    console.error("Ошибка при добавлении лайка/дизлайка:", error);
    return "error";
  }
};
