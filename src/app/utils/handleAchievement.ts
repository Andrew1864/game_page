import { Dispatch } from "@reduxjs/toolkit";
import {
  addClickedTech,
  setAchievements,
  setProgress,
} from "../slices/userSlice";

interface AchievementParams {
  userId: number;
  dispatch: Dispatch;
  setIsAlertOpen: (open: boolean) => void;
  context: string; // например "React", "Green_pulse"
  mode?: "visit" | "learn" | "action";
}

export const handleAchievement = async ({
  userId,
  dispatch,
  setIsAlertOpen,
  context,
  mode = "learn",
}: AchievementParams) => {
  let achievementTitle = "";

  if (mode === "visit") {
    achievementTitle = `Зашёл в ${context}`;
  } else if (mode === "action") {
    achievementTitle = `Поставил лайк или дизлайк в ${context}`;
  } else {
    achievementTitle = `Узнал про ${context}`;
  }

  const newAchievement = {
    title: achievementTitle,
    points: 10,
    date: new Date().toDateString(),
    completed: true,
  };

  try {
    const res = await fetch(`http://localhost:3001/users/${userId}`);
    const user = await res.json();

    const alreadyGot = user.achievements.some(
      (ach: { title: string }) => ach.title === achievementTitle
    );
    if (alreadyGot) return;

    const updatedAchievements = [...user.achievements, newAchievement];

    await fetch(`http://localhost:3001/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress: user.progress + 10,
        achievements: updatedAchievements,
      }),
    });

    dispatch(setAchievements(updatedAchievements));
    dispatch(addClickedTech(context));
    dispatch(setProgress(user.progress + 10));
    setIsAlertOpen(true);
  } catch (error) {
    console.error("Ошибка обновления:", error);
  }
};
