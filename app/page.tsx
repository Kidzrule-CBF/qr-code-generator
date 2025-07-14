"use client";
import { useState, useRef } from "react";
import QRCode from "react-qr-code";

export default function Home() {
  const [platform, setPlatform] = useState("venmo");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  function getPaymentUrl() {
    if (platform === "venmo") {
      // Venmo: https://venmo.com/username?txn=pay&amount=1.00&note=Hello
      const base = `https://venmo.com/${encodeURIComponent(recipient)}`;
      const params = [];
      if (amount) params.push(`amount=${encodeURIComponent(amount)}`);
      if (note) params.push(`note=${encodeURIComponent(note)}`);
      params.push("txn=pay");
      return `${base}?${params.join("&")}`;
    } else if (platform === "paypal") {
      // PayPal: https://www.paypal.me/username/amount
      let url = `https://www.paypal.me/${encodeURIComponent(recipient)}`;
      if (amount) url += `/${encodeURIComponent(amount)}`;
      return url;
    } else if (platform === "zelle") {
      // Zelle: No universal URL, but we can encode recipient info
      // We'll use a custom format: zelle://pay?to=recipient&amount=amount&note=note
      let url = `zelle://pay?to=${encodeURIComponent(recipient)}`;
      if (amount) url += `&amount=${encodeURIComponent(amount)}`;
      if (note) url += `&note=${encodeURIComponent(note)}`;
      return url;
    }
    return "";
  }

  function handleDownload() {
    const svg = qrRef.current?.querySelector("svg");
    if (svg) {
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svg);
      const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `payment-qr-${platform}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f9f9f9" }}>
      <h1>QR Code Payment Generator</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          minWidth: 320,
          marginBottom: 32,
        }}
        onSubmit={e => e.preventDefault()}
      >
        <label>
          Payment Platform:
          <select value={platform} onChange={e => setPlatform(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="venmo">Venmo</option>
            <option value="zelle">Zelle</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <label>
          Recipient ({platform === "paypal" ? "PayPal.me username" : platform === "venmo" ? "Venmo username" : "Email/Phone"}):
          <input
            type="text"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            required
            placeholder={platform === "zelle" ? "Email or phone" : "Username"}
            style={{ marginLeft: 8, width: "100%" }}
          />
        </label>
        <label>
          Amount (optional):
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="e.g. 10.00"
            style={{ marginLeft: 8, width: "100%" }}
          />
        </label>
        <label>
          Note (optional):
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="e.g. Thanks!"
            style={{ marginLeft: 8, width: "100%" }}
          />
        </label>
      </form>
      <div ref={qrRef} style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 16 }}>
        <QRCode value={getPaymentUrl()} size={220} />
      </div>
      <button onClick={handleDownload} style={{ padding: "8px 20px", borderRadius: 6, border: "none", background: "#0070f3", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
        Download QR Code
      </button>
      <p style={{ marginTop: 32, color: "#888", fontSize: 14 }}>Enter payment details above to generate a QR code for Venmo, Zelle, or PayPal.</p>
    </div>
  );
}
