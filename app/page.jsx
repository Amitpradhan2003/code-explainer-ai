"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Home() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [commentedCode, setCommentedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [commenting, setCommenting] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    setExplanation("");
    setCommentedCode("");

    const res = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setExplanation(data.explanation || "No explanation found.");
    setLoading(false);
  };

  const handleComment = async () => {
    setCommenting(true);
    setCommentedCode("");

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setCommentedCode(data.commentedCode || "No commented code found.");
    setCommenting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        💡 AI Code Explainer & Commenter
      </h1>

      <textarea
        className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={10}
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleExplain}
          disabled={loading || !code.trim()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          {loading ? "Explaining..." : "Explain Code"}
        </button>

        <button
          onClick={handleComment}
          disabled={commenting || !code.trim()}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
        >
          {commenting ? "Commenting..." : "Add AI Comments"}
        </button>
      </div>

      {(explanation || commentedCode) && (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {explanation && (
            <div className="bg-gray-800 p-5 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">🧠 Explanation</h2>
              <p className="whitespace-pre-wrap">{explanation}</p>
            </div>
          )}

          {commentedCode && (
            <div className="bg-gray-800 p-5 rounded-lg overflow-auto">
              <h2 className="text-xl font-semibold mb-2">
                💬 AI-Commented Code
              </h2>
              <SyntaxHighlighter language="javascript" style={oneDark}>
                {commentedCode}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
