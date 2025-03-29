import React, { useRef } from "react";
import html2canvas from "html2canvas";

const downloadPoetryImage = (poetry) => {
  const { title, content, author, logoUrl } = poetry;

  // Create a temporary container div
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px"; // Hide it
  tempDiv.innerHTML = `
    <div style="
      width: 400px;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      background: linear-gradient(135deg, #6A5ACD, #FF69B4);
      color: white;
      font-family: Arial, sans-serif;
      box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
    ">
      <img src="${logoUrl}" alt="Website Logo" style="width: 80px; margin-bottom: 10px;" />
      <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">${title}</h2>
      <p style="font-size: 18px; line-height: 1.5;">${content.replace(/\n/g, "<br>")}</p>
      <p style="margin-top: 10px; font-size: 14px; font-weight: bold;">By: ${author}</p>
      <div style="margin-top: 15px; display: flex; justify-content: space-between; font-size: 16px;">
        <span>❤️ 0</span>
        <span>💬 0</span>
      </div>
    </div>
  `;

  document.body.appendChild(tempDiv);

  html2canvas(tempDiv, { backgroundColor: null, useCORS: true }).then((canvas) => {
    const image = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement("a");
    link.href = image;
    link.download = `${title.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Remove the temporary div
    document.body.removeChild(tempDiv);
  });
};

const PoetryDownloadButton = () => {
  const poetry = {
    title: "रूह से निकली जो बात",
    content: `रूह से निकली जो बात है, 
    वो ही शायरी की सौगात है।
    लफ़्ज़ों में बसी जो मोहब्बत है,
    वो ही दिलों की मुलाकात है। ❤️✨`,
    author: "Dishant Chauhan",
    logoUrl: "https://your-website.com/logo.png" // Replace with actual logo URL
  };

  return (
    <button onClick={() => downloadPoetryImage(poetry)}>
      Download Poetry as PNG
    </button>
  );
};

export default PoetryDownloadButton;
