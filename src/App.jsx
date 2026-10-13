import { useEffect, useState } from "react";
import "./App.css";
const API = "https://6a830a1ecb486d2434033464.mockapi.io/nguoidung";

export default function App() {
  const [data, setData] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [sortKey, setSortKey] = useState("hoten");
  const [sortDir, setSortDir] = useState("asc") ;
  const [view, setView] = useState("table");

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((d) => setData(Array.isArray(d) ? d : []))
      .catch((e) => console.log("Lỗi:", e));
  }, []);

  //CN loc hoten
  const result = data.filter((it)=>
   String(it.hoten ?? "")
    .toLowerCase()
    .includes(keyword.trim().toLowerCase()) 
  );

  //SX theo ten
  result.sort((a,b) =>{
    let cmp;
    if(sortKey === "id"){
      cmp = Number(a.id) - Number(b.id);
    }else {
      cmp = String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? ""), "vi");
    }
    return sortDir ==="asc" ? cmp : -cmp;
  });

  return (
    <div className="container">
      <h1>Danh sách người dùng ({data.length})</h1>

      <div className="toolbar">
        <input
          placeholder="Tim theo ho ten..."
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
        />

        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="hoten">Sap xep theo hoten</option>
          <option value="quocgia">Sap xep theo quocgia</option>
        </select>

        <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="asc">Tang</option>
          <option value="desc">Giam</option>
        </select>

        <button onClick={() => setView(view === "table" ? "grid" : "table")}>
          {view === "table" ? "Xem dạng Grid" : "Xem dạng Table"}
        </button>
      </div>

      {result.length === 1 ? (
        <div className="detail">
          <h2>{result[0].hoten}</h2>
          <p><b>ID:</b> {result[0].id}</p>
          <p><b>Địa chỉ:</b> {result[0].diachi}</p>
          <p><b>Quốc gia:</b> {result[0].quocgia}</p>
          <p><b>Điện thoại:</b> {result[0].phone}</p>
        </div>
      ) : (
        <p>tim thay {result.length} KQ</p>
      )}

      {view === "table" ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Địa chỉ</th>
              <th>Quốc Gia</th>
              <th>Điện thoại</th>
            </tr>
          </thead>
          <tbody>
            {result.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.hoten}</td>
                <td>{it.diachi}</td>
                <td>{it.quocgia}</td>
                <td>{it.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid">
          {result.map((it) => (
            <div className="card" key={it.id}>
              <h3>{it.hoten}</h3>
              <p>{it.diachi}</p>
              <p>{it.quocgia}</p>
              <p>{it.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}