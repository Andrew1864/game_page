"use client";

import { useState } from "react";

interface GalleryProps {
  screenshots: string[]; // Массив ссылок на скриншоты
}

const Gallery = ({ screenshots }: GalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Скриншоты проекта.</h2>
      <div className="flex gap-8 overflow-x-auto">
        {screenshots.map((screenshot, index) => (
          <img
            key={index}
            src={screenshot}
            alt={`Скриншот ${index + 1}`}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
            onClick={() => openModal(screenshot)} // Открытие модального окна
          />
        ))}
      </div>
      {/* Модальное окно для увеличенного изображения */}
      {isModalOpen && (
        <div
          className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal} // Закрытие при клике вне изображения
        >
          <img
            src={currentImage}
            alt="Увеличенное изображение"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg outline-none transition-transform duration-300 scale-100 hover:scale-105"
            onClick={(e) => e.stopPropagation()} // Остановить закрытие при клике на изображение
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
