import React, { useState } from "react";

interface PlayerSetupProps {
  onStart: (players: string[]) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStart }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState<string[]>(["", ""]);
  const [showPopup, setShowPopup] = useState(false);

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setNumPlayers(value);
    setPlayers(Array(value).fill(""));
  };

  const handleNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const startGame = () => {
    const filledPlayers = players.filter((p) => p.trim() !== "");
    if (filledPlayers.length < numPlayers) {
      setShowPopup(true); // بوب أب بدل alert
      return;
    }
    onStart(players);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1e60, #0d0d2d)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Card */}
      <div
        style={{
          background: "#fff",
          color: "#080844",
          borderRadius: "20px",
          padding: "30px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
          👥 إعداد اللاعبين
        </h2>

        {/* اختيار عدد اللاعبين */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
            اختر عدد اللاعبين:
          </label>
          <select
            value={numPlayers}
            onChange={handleNumPlayersChange}
            style={{
              marginLeft: "10px",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {Array.from({ length: 9 }, (_, i) => i + 2).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* إدخال أسماء اللاعبين */}
        <div style={{ marginBottom: "1.5rem" }}>
          {players.map((player, index) => (
            <input
              key={index}
              type="text"
              placeholder={`اسم اللاعب ${index + 1}`}
              value={player}
              onChange={(e) => handleNameChange(index, e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "1rem",
              }}
            />
          ))}
        </div>

        <button
          onClick={startGame}
          style={{
            padding: "14px 28px",
            fontSize: "1.1rem",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#080844",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          🚀 ابدأ اللعب
        </button>
      </div>

      {/* البوب أب */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "25px",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#d32f2f" }}>
              ⚠️ تنبيه
            </h3>
            <p style={{ marginBottom: "20px", fontSize: "1rem" }}>
              رجاءً أدخل أسماء جميع اللاعبين!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#080844",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              حسنًا
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerSetup;
