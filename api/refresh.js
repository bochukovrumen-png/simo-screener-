export default async function handler(req, res) {
  try {
    const symbols = ["BTCUSDT", "ETHUSDT"];

    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const r = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );

        const data = await r.json();

        return {
          symbol,
          price: data.price ? parseFloat(data.price) : null,
          signal: Math.random() > 0.5 ? "BUY" : "SELL"
        };
      })
    );

    res.status(200).json({ signals: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
