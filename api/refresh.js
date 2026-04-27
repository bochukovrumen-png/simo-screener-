export default async function handler(req, res) {
  try {
    const r = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
      {
        headers: {
          "Accept": "application/json"
        }
      }
    );

    const data = await r.json();

    const coins = data.map(c => ({
      symbol: c.symbol.toUpperCase(),
      name: c.name,
      price: c.current_price
    }));

    res.status(200).json({ coins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
