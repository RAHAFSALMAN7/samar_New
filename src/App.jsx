import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import PlayerSetup from "./components/PlayerSetup";
import SectionsScreen from "./components/SectionsScreen";
import Gameboard from "./components/gameboard"; // 👈 استدعاء شاشة اللعبة
import InstructionScreen from "./components/InstructionScreen"; // 👈 شاشة التعليمات

const App = () => {
  const [screen, setScreen] = useState("home"); // home → setup → sections → game → instruction
  const [players, setPlayers] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div style={{ width: "100%", padding: 0, margin: 0 }}>
      {/* شاشة البداية */}
      {screen === "home" && <HomeScreen onStart={() => setScreen("setup")} />}

      {/* شاشة إعداد اللاعبين */}
      {screen === "setup" && (
        <PlayerSetup
          onStart={(playersList) => {
            setPlayers(playersList);
            setScreen("sections"); // بعد إدخال اللاعبين ننتقل لسكشنز
          }}
        />
      )}

      {/* شاشة اختيار السكشنز */}
      {screen === "sections" && (
        <SectionsScreen
          onSelect={(sectionId) => {
            if (sectionId === "instruction") {
              // التعديل: إذا اخترت "التعليمات" ننتقل للشاشة بدل فتح نافذة جديدة
              setScreen("instruction");
            } else {
              setSelectedSection(sectionId);
              setScreen("game"); // بعد اختيار سكشن نروح على اللعبة
            }
          }}
          onBackHome={() => setScreen("home")} // 🏠 زر العودة للصفحة الرئيسية
        />
      )}

      {/* شاشة اللعبة */}
      {screen === "game" && selectedSection && (
        <Gameboard
          players={players}
          section={selectedSection}
          onBack={() => setScreen("sections")} // زر الرجوع للسكشنز
        />
      )}

      {/* شاشة التعليمات */}
      {screen === "instruction" && (
        <InstructionScreen onBack={() => setScreen("sections")} /> // زر العودة للسكشنز
      )}
    </div>
  );
};

export default App;
