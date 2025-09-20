import React from "react";

// ✅ تعريف أقسام الكروت (كل قسم عبارة عن id + اسم + صورة)
const sections = [
  { id: "mn_al_akher", name: "  ", image: "/assets/mn_al_akher.png" },
  { id: "khayalak", name: "", image: "/assets/khayalak.png" },
  { id: "min_qalbik", name: "", image: "/assets/min_qalbik.png" },
  { id: "mood", name: "", image: "/assets/mood.png" },
  { id: "waraqak", name: " ", image: "/assets/waraqak.png" },
  { id: "instruction", name: " ", image: "/assets/instruction.png" },
];

// ✅ شاشة اختيار الأقسام
const SectionsScreen = ({
  onSelect,
  onBackHome,
}: {
  onSelect: (id: string) => void; // لما يختار المستخدم قسم
  onBackHome: () => void; // للرجوع للهوم
}) => {
  // ✅ التعامل مع اختيار القسم
  const handleSelect = (id: string) => {
    onSelect(id);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#002A4f", // الأزرق الكحلي
        color: "#EBEBDF", // نص أبيض كريمي
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* 🔙 زر العودة للصفحة الرئيسية */}
      <button
        onClick={onBackHome}
        style={{
          alignSelf: "flex-start",
          marginBottom: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#EBEBDF", // زر أبيض
          color: "#002A4f", // نص أزرق
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        🏠 العودة للصفحة الرئيسية
      </button>

      {/* 🎴 عنوان الشاشة */}
      <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        🎴 اختر مجموعة الكروت
      </h2>

      {/* ✅ عرض الأقسام كشبكة (grid) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 أعمدة
          gap: "20px",
          width: "100%",
          maxWidth: "800px",
          justifyItems: "center",
        }}
      >
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => handleSelect(section.id)}
            style={{
              cursor: "pointer",
              textAlign: "center",
              backgroundColor: "#002A4f",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)", // ظل حول الكرت
              transition: "transform 0.2s, box-shadow 0.2s",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 12px 25px rgba(0, 0, 0, 0.6)"; // ظل أكبر عند المرور
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0, 0, 0, 0.5)";
            }}
          >
            {/* صورة القسم */}
            <img
              src={section.image}
              alt={section.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />

            {/* اسم القسم */}
            <p
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                color: "#EBEBDF",
              }}
            >
              {section.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsScreen;
