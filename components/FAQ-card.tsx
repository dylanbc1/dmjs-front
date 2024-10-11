'use client'
import { useState } from 'react';

interface FAQCardProps {
  question: string;
  answer: string;
}

export const  FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-card">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
      <style jsx>{`
        .faq-card {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .faq-question {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }
        .faq-answer {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
      `}</style>
    </div>
  );
};

export default FAQCard;
