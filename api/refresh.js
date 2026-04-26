export default async function handler(req, res) {
  try {
    const symbols = ["BTCUSDT", "ETHUSDT"];

    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        const data = await response.json();

        return {
          symbol,
          price: parseFloat(data.price),
          signal: Math.random() > 0.5 ? "BUY" : "SELL"
        };
      })
    );

    res.status(200).json({ signals: results });
  } catch (error) {
    res.status(500).json({ error: "API error" });
  }
}
