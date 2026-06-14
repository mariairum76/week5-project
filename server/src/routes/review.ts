import { Router } from "express";
import { pool } from "../db";

const router = Router();

/**
 * CREATE REVIEW (AI MOCK + FUTURE READY)
 */
router.post("/", async (req, res) => {
  try {
    const { userId, code } = req.body;

    if (!userId || !code) {
      return res.status(400).json({ error: "userId and code required" });
    }

    console.log("Incoming request:", req.body);

    const review = `
🧠 AI CODE REVIEW

✔ Improve readability
✔ Use meaningful variable names
✔ Add error handling
✔ Avoid repetition
✔ Break logic into functions
✔ Optimize performance

💡 Tip: Always follow DRY principle
`;

    await pool.query(
      `INSERT INTO code_reviews (user_id, code, review)
       VALUES ($1, $2, $3)`,
      [userId, code, review]
    );

    return res.json({ review });
  } catch (err) {
    console.error("CREATE REVIEW ERROR:", err);
    return res.status(500).json({ error: "Failed to generate review" });
  }
});

/**
 * HISTORY
 */
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT * FROM code_reviews 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.json(result.rows);
  } catch (err) {
    console.error("HISTORY ERROR:", err);
    return res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;