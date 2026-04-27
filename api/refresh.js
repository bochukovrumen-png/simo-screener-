export default async function handler(req, res) {
  try {
    const symbols = ["BTC", "ETH"];

    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const r = await fetch(
          `https://api.coinbase.com/v2/prices/${symbol}-USD/spot`
        );

        const data = await r.json();

        return {
          symbol: symbol + "USDT",
          price: parseFloat(data.data.amount),
          signal: Math.random() > 0.5 ? "BUY" : "SELL"
        };
      })
    );

    res.status(200).json({ signals: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
