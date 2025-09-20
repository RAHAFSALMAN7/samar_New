import React from "react";

interface CardProps {
  image: string;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <img
        src={image.startsWith("/src/") ? image.replace("/src", "") : image}
        alt="card"
        style={{
          width: "250px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
};

export default Card;
