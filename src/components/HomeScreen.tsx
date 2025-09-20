import React from "react";

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // يوسّط عموديًا
        alignItems: "center",     // يوسّط أفقيًا
        backgroundColor: "#080844",
        color: "#EBEBDF",
        textAlign: "center",
        padding: 0,
        boxSizing: "border-box",
        direction: "ltr",
      }}
    >
      {/* ✅ تعديل مسار الصورة */}
      <img
        src="/assets/CARDS_01.jpg"
        alt="سمر كرت"
        style={{
          width: "260px",
          maxWidth: "80%",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          marginBottom: "2rem",
        }}
      />

      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        أهلاً بك في لعبة سمر
      </h1>
      <p style={{ fontSize: "1.1rem", maxWidth: "400px", marginBottom: "2rem" }}>
        استعد للتحدي وابدأ اللعبة الآن 🚀
      </p>

      <button
        onClick={onStart}
        style={{
          padding: "12px 32px",
          fontSize: "1.2rem",
          borderRadius: "12px",
          border: "none",
          backgroundColor: "#EBEBDF",
          color: "#080844",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "all 0.3s ease-in-out",
        }}
        className="start-btn"
      >
        🚀 ابدأ اللعبة
      </button>

      <style>
        {`
          .start-btn:hover {
            opacity: 0.85;
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
};

export default HomeScreen;
