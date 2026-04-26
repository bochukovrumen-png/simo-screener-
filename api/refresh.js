export default function handler(req, res) {
  res.status(200).json({
    signal: "BUY",
    price: 42000,
    time: new Date().toISOString()
  });
}
