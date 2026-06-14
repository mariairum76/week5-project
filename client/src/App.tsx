import { useEffect, useState } from "react";
import Auth from "./Auth";
import { createReview, getHistory } from "./api/review";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  /**
   * LOAD HISTORY
   */
  const loadHistory = async () => {
    if (!userId) return;

    const data = await getHistory(Number(userId));
    setHistory(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (userId) loadHistory();
  }, [userId]);

  /**
   * GENERATE REVIEW
   */
  const generateReview = async () => {
    if (!userId) return setReview("⚠️ Please login first");
    if (!code.trim()) return setReview("⚠️ Please write code first");

    setLoading(true);

    const res = await createReview(Number(userId), code);
    setReview(res.review || "No review received");

    await loadHistory();

    setLoading(false);
  };

  /**
   * LOGOUT
   */
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!userId) return <Auth />;

  return (
    <div style={styles.page}>
      {/* LEFT */}
      <div style={styles.left}>
        <div style={styles.topBar}>
          <h2>🚀 AI Code Reviewer</h2>

          {/* LOGOUT FIXED ⭐ */}
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>

        <textarea
          style={styles.textarea}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
        />

        {/* GENERATE BUTTON PROMINENT ⭐ */}
        <button style={styles.generateBtn} onClick={generateReview}>
          {loading ? "Analyzing..." : "✨ Generate Review"}
        </button>

        {/* COPY BUTTON PROMINENT ⭐ */}
        {review && (
          <button
            style={styles.copyBtn}
            onClick={() => navigator.clipboard.writeText(review)}
          >
            📋 Copy Review
          </button>
        )}

        <div style={styles.reviewBox}>
          <h3>🧠 AI Review</h3>
          <pre>{review}</pre>
        </div>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <h3>📜 History</h3>

        {history.length === 0 && (
          <p style={{ color: "#777" }}>No history yet</p>
        )}

        {history.map((item, i) => (
          <div key={i} style={styles.card}>
            <pre>{item.code}</pre>
            <pre>{item.review}</pre>

            {item.created_at && (
              <small style={{ color: "gray" }}>
                {new Date(item.created_at).toLocaleString()}
              </small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * STYLES (IMPROVED UI ⭐)
 */
const styles: any = {
  page: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },

  left: {
    flex: 1,
    padding: "20px",
    background: "#0f172a",
    color: "white",
  },

  right: {
    width: "40%",
    padding: "20px",
    background: "#f1f5f9",
    overflowY: "auto",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textarea: {
    width: "100%",
    height: "200px",
    marginTop: "15px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  generateBtn: {
    marginTop: "12px",
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #3b82f6, #6366f1)",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  copyBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "8px 12px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  reviewBox: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "12px",
    borderRadius: "10px",
  },

  card: {
    background: "white",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
};

export default App;