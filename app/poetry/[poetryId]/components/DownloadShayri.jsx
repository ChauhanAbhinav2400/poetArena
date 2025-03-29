  export const downloadPoetryHTML = (poetry) => {
    const { title, content, posterName, logoUrl,likes,comments } = poetry;

    const commentsCounts=comments?.length
  
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #1c1c1c;
          }
          .poetry-card {
            max-width: 400px;
            background: linear-gradient(135deg, #6A5ACD, #FF69B4);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
            text-align: center;
          }
          .logo {
            max-width: 100px;
            margin-bottom: 10px;
          }
          h1 {
            font-size: 20px;
            margin-bottom: 15px;
          }
          p {
            font-size: 18px;
            line-height: 1.5;
          }
          .author {
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
          }
          .footer {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="poetry-card">
          <img src="https://i.ibb.co/0pRgNZzR/Simple-attire-200-x-50-px-1.png" class="logo" alt="Website Logo">
          <h1>${title}</h1>
          <p>${content.replace(/\n/g, "<br>")}</p>
          <div class="author">By: ${posterName}</div>
          <div class="footer">
            <span>❤️ ${likes}</span>
            <span>💬 ${commentsCounts}</span>
          </div>
        </div>
      </body>
      </html>
    `;
  
    const blob = new Blob([htmlTemplate], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, "_")}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };