"use client";

import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

interface AchievementCardProps {
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  completed,
  points,
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {completed ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <LockOutlineIcon className="text-gray-400" />
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300">
        {completed ? (
          <>
            Прогресс: <span className="text-green-500">+{points} очков</span>
          </>
        ) : (
          <>
            Для получения: <span className="italic">{description}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default AchievementCard;
