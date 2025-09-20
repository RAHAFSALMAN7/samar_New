// src/components/Gameboard.tsx
import React, { useState, useEffect } from "react";
import { cardsData } from "../data/cards";

// Union type لكل السكشنز الموجودة في cardsData
type Section =
  | "mn_al_akher"
  | "khayalak"
  | "min_qalbik"
  | "mood"
  | "waraqak"
  | "instruction"
  | "marawgha";

interface CardProps {
  image: string;
}

const Card: React.FC<CardProps> = ({ image }) => {
  const [flipped, setFlipped] = useState(false);

  const flipMap: { [key: string]: string } = {
    "card2.png": "/assets/cards/marawgha/card7.png",
    "card4.png": "/assets/cards/marawgha/card5.png",
    "card8.png": "/assets/cards/marawgha/card3.png",
  };

  const fileName = image.split("/").pop() || "";
  const hasFlip = flipMap[fileName] !== undefined;

  return (
    <div
      style={{
        perspective: "1000px",
        width: "320px",
        height: "420px",
        marginTop: "30px",
      }}
      onClick={() => {
        if (hasFlip) setFlipped(!flipped);
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* الوجه الأمامي */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 12px 25px rgba(255, 255, 255, 0.5)",
          }}
        >
          <img
            src={image}
            alt="Card"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* الوجه الخلفي */}
        {hasFlip && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 12px 25px rgba(255, 255, 255, 0.5)",
            }}
          >
            <img
              src={flipMap[fileName]}
              alt="Back"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface GameboardProps {
  players: string[];
  section: Section; // استخدمنا النوع union type هنا
  onBack: () => void;
}

const Gameboard: React.FC<GameboardProps> = ({ players, section, onBack }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [remainingCards, setRemainingCards] = useState(cardsData[section] || []);
  const [displayedCard, setDisplayedCard] = useState<string | null>(null);
  const [playerMarawghaUsed, setPlayerMarawghaUsed] = useState<{ [key: string]: boolean }>({});
  const [showExplainPopup, setShowExplainPopup] = useState(false);
  const [showChoosePopup, setShowChoosePopup] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const nextPlayer = players[(currentPlayerIndex + 1) % players.length];

  useEffect(() => {
    if (remainingCards.length > 0 && !displayedCard) {
      drawCard();
    }
  }, []);

  const drawCard = () => {
    if (remainingCards.length === 0) {
      setShowEndPopup(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const selectedCard = remainingCards[randomIndex];
    const newCards = [...remainingCards];
    newCards.splice(randomIndex, 1);
    setRemainingCards(newCards);
    setDisplayedCard(selectedCard);
  };

  const drawMarawghaCard = () => {
    if (playerMarawghaUsed[currentPlayer]) {
      alert("⚠️ لقد سحبت كرت المراوغة مسبقًا!");
      return;
    }
    const marawghaCard = "/assets/cards/marawgha/first.png";
    setDisplayedCard(marawghaCard);
    setPlayerMarawghaUsed({ ...playerMarawghaUsed, [currentPlayer]: true });
  };

  const nextTurn = () => {
    drawCard();
    setShowExplainPopup(false);
    setShowChoosePopup(false);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f4eddf 0%, #f4eddf 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* باقي الكود كما هو بدون تغييرات */}
      {/* زر الرجوع */}
      <button
        onClick={onBack}
        style={{
          alignSelf: "flex-start",
          marginBottom: "25px",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#002A4f",
          color: "#EBEBDF",
          fontWeight: "bold",
          fontSize: "1rem",
          transition: "all 0.2s ease",
        }}
      >
        🔙 رجوع للسكشنز
      </button>

      {/* اللاعب الحالي واللاعب التالي */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            backgroundColor: "#4f0000",
            padding: "20px 30px",
            borderRadius: "16px",
            textAlign: "center",
            minWidth: "150px",
          }}
        >
          <h3 style={{ margin: 0, fontWeight: "bold", color: "#ffffffff" }}>🎮 الدور الحالي</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffffffff", marginTop: "10px" }}>
            {currentPlayer}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#4f0000",
            padding: "20px 30px",
            borderRadius: "16px",
            textAlign: "center",
            minWidth: "150px",
          }}
        >
          <h3 style={{ margin: 0, fontWeight: "bold", color: "#ffffffff" }}>➡️ اللاعب التالي</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffffffff", marginTop: "10px" }}>
            {nextPlayer}
          </p>
        </div>
      </div>

      {/* عداد الكروت */}
      <p style={{ marginBottom: "20px", fontSize: "1rem", color: "#4f0000" }}>
        الكروت المتبقية: {remainingCards.length}
      </p>

      {/* عرض الكرت */}
      {displayedCard ? (
        <div style={{ textAlign: "center" }}>
          <Card image={displayedCard} />

          {/* أزرار كرت المراوغة */}
          {displayedCard.includes("marawgha") && (
            <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={() => setShowExplainPopup(true)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#4f0000",
                  color: "#EBEBDF",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                الشرح
              </button>

              <button
                onClick={() => setShowChoosePopup(true)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#006400",
                  color: "#EBEBDF",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                اختار
              </button>
            </div>
          )}
        </div>
      ) : (
        <p style={{ fontSize: "1.1rem", marginTop: "20px", color: "#002A4f" }}>
          اضغط التالي لسحب كرت 🎴
        </p>
      )}

      {/* زر كرت المراوغة */}
      <button
        onClick={drawMarawghaCard}
        style={{
          marginTop: "15px",
          padding: "10px 24px",
          fontSize: "1.1rem",
          borderRadius: "12px",
          border: "none",
          backgroundColor: "#4f0000",
          color: "#EBEBDF",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        كرت المراوغة 🃏
      </button>

      {/* زر التالي */}
      <button
        onClick={nextTurn}
        style={{
          marginTop: "15px",
          padding: "12px 28px",
          fontSize: "1.3rem",
          borderRadius: "12px",
          border: "none",
          backgroundColor: "#002A4f",
          color: "#EBEBDF",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        التالي ▶️
      </button>

      {/* باقي البوب أب كما هو بدون أي تعديل */}
    </div>
  );
};

export default Gameboard;
