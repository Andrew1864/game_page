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
    <div className="card w-72 bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title mb-4">{question}</h2>
        {answers.map((answer, idx) => (
          <div className="flex items-center mb-2" key={idx}>
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary mr-2"
              // disabled // Если не нужен ввод, можно раскомментировать
            />
            <span className="label-text">{answer.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardForTest;