import express from "express";
import multer from "multer";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }
});
app.get("/", (_req, res) => res.sendFile(new URL("./index.html", import.meta.url).pathname));

app.post("/api/recognize", upload.single("audio"), async (req, res) => {
  try {
    const token = process.env.AUDD_API_TOKEN;
    if (!token) return res.status(503).json({ error: "サーバーにAUDD_API_TOKENが設定されていません" });
    if (!req.file) return res.status(400).json({ error: "音声ファイルがありません" });

    const form = new FormData();
    form.append("api_token", token);
    form.append("return", "apple_music,spotify");
    const audio = new Blob([req.file.buffer], { type: req.file.mimetype || "application/octet-stream" });
    form.append("file", audio, req.file.originalname || "sample");

    const upstream = await fetch("https://api.audd.io/", { method: "POST", body: form });
    const data = await upstream.json();
    if (!upstream.ok) return res.status(502).json({ error: `音楽認識サービス HTTP ${upstream.status}` });
    if (data.status !== "success") return res.status(502).json({ error: data.error?.error_message || "音楽認識サービスがエラーを返しました" });
    res.json({ result: data.result || null });
  } catch (error) {
    res.status(500).json({ error: "認識処理に失敗しました。サーバーログを確認してください。" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Spectrum deck listening on ${port}`));
