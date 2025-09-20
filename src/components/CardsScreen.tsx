// src/components/InstructionCards.tsx
import React, { useState } from "react";

interface InstructionCardsProps {
  onBack: () => void; // دالة للعودة لشاشة السكشن
}

// مسارات الصور بعد التعديل لتكون من مجلد public
const instructionImages = [
  "/assets/cards/instruction/card1.png",
  "/assets/cards/instruction/card2.png",
  "/assets/cards/instruction/card3.png",
  "/assets/cards/instruction/card4.png",
];

const InstructionCards: React.FC<InstructionCardsProps> = ({ onBack }) => {
  const [popupImg, setPopupImg] = useState<string | null>(null);

  return (
    <div
      style={{
        fontFamily: "Cairo, sans-serif",
        backgroundColor: "#002A4f",
        color: "#EBEBDF",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.05)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
        }}
      >
        <h1>📖 كروت التعليمات</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {instructionImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Card ${index + 1}`}
              style={{
                width: "200px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onClick={() => setPopupImg(img)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          ))}
        </div>

        <button
          onClick={onBack}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            borderRadius: "8px",
            backgroundColor: "#EBEBDF",
            color: "#002A4f",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          🏠 العودة للعبة
        </button>
      </div>

      {/* Popup */}
      {popupImg && (
        <div
          onClick={() => setPopupImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img
            src={popupImg}
            alt="popup card"
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InstructionCards;
