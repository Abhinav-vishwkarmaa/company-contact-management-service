const generateEmailTemplate = (title, message, buttonText = 'Visit Website', buttonLink = '#') => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #000000;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #000000;
    }
    .content-wrapper {
      padding: 40px 20px;
    }
    .card {
      background-color: #0a0a0a;
      border: 1px solid #333333;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
    }
    .logo {
      margin-bottom: 30px;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #ffffff;
      text-transform: uppercase;
    }
    .logo span {
      color: #A855F7; /* Primary Purple */
    }
    h1 {
      font-size: 28px;
      margin-bottom: 20px;
      color: #ffffff;
    }
    p {
      color: #9CA3AF; /* Gray-400 */
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
      white-space: pre-line; /* Preserves newlines in text */
    }
    .btn {
      display: inline-block;
      background-color: #A855F7; /* Primary Purple */
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 50px;
      font-weight: bold;
      font-size: 16px;
      transition: background-color 0.3s;
      box-shadow: 0 4px 14px 0 rgba(168, 85, 247, 0.39);
    }
    .btn:hover {
      background-color: #9333ea; /* Purple-600 */
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      color: #4B5563; /* Gray-600 */
      font-size: 12px;
    }
    .social-links {
      margin-bottom: 20px;
    }
    .social-link {
      color: #9CA3AF;
      text-decoration: none;
      margin: 0 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content-wrapper">
      <!-- Logo -->
      <div class="logo">
        Abhi<span>NextGen</span>
      </div>

      <!-- Main Card -->
      <div class="card">
        <h1>${title}</h1>
        <p>
          ${message}
        </p>
        
        ${buttonText && buttonLink ? `<a href="${buttonLink}" class="btn">${buttonText}</a>` : ''}
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="social-links">
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">LinkedIn</a>
          <a href="#" class="social-link">Instagram</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} AbhiNextGen. All rights reserved.<br>
        Remote-first, Worldwide.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;
};

module.exports = generateEmailTemplate;
