"use client";

export interface CardForTestProps {
  question: string;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
}

const CardForTest = ({ question, answers }: CardForTestProps) => {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 break-words">
          {question}
        </h2>
        <div className="flex flex-col gap-3">
          {answers.map((answer, idx) => (
            <label
              key={idx}
              className="flex items-center px-3 py-2 rounded-lg border border-gray-100 hover:border-gray-300 transition bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary mr-3"
                // disabled // если не нужен ввод
              />
              <span className="text-gray-700 text-base break-words">
                {answer.text}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardForTest;
