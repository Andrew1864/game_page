"use client";

export interface CardForTestProps {
  question: string;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
}

const CardForTest = ({
  question,
  answers,
  selected,
  onSelect,
}: CardForTestProps & {
  selected: number | null;
  onSelect: (idx: number) => void;
}) => {
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
              className={`flex items-center px-3 py-2 rounded-lg border ${
                selected === idx
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-100 hover:border-gray-300"
              } transition cursor-pointer`}
            >
              <input
                type="radio"
                className="radio radio-sm radio-primary mr-3"
                name="answer"
                checked={selected === idx}
                onChange={() => onSelect(idx)}
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
