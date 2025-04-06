"use client";

interface ModalInfoProps {
  title: string;
  description: string;
  onClose: () => void;
}

const ModalInfo: React.FC<ModalInfoProps> = ({
  title,
  description,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl w-[300px]">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ModalInfo;
