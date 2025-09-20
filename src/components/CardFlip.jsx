// src/components/CardFlip.jsx
import React from "react";

export default function CardFlip({ flipped, question, onFlip }) {
  return (
    <div
      className="relative w-80 h-96 md:w-96 md:h-[500px] cursor-pointer"
      onClick={onFlip}
    >
      <div className={`card-flip-container ${flipped ? "flipped" : ""}`}>
        {/* وجه الخلف */}
        <div className="card-face card-back bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎴</div>
            <h4 className="text-2xl font-bold text-gray-800">اضغط للكشف</h4>
          </div>
        </div>

        {/* وجه الكرت */}
        <div className="card-face card-front bg-white text-gray-800 rounded-3xl shadow-2xl flex items-center justify-center p-6">
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-center">
            {question}
          </p>
        </div>
      </div>

      <style>
        {`
          .card-flip-container {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.8s;
            transform-style: preserve-3d;
          }
          .card-flip-container.flipped {
            transform: rotateY(180deg);
          }
          .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
          }
          .card-back {
            transform: rotateY(0deg);
          }
          .card-front {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
}
