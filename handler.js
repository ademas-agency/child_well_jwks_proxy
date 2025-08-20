const https = require("https");

exports.jwks = async () => {
  const url = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USERPOOL_ID}/.well-known/jwks.json`;

  console.log("🔗 Fetching JWKS from:", url);

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        console.log("✅ JWKS fetched successfully");
        resolve({
          statusCode: res.statusCode || 200,
          headers: { "Content-Type": "application/json" },
          body: data,
        });
      });
    }).on("error", (err) => {
      console.error("❌ Fetch error:", err);
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch JWKS", details: err.message }),
      });
    });
  });
};
