import { useEffect, useState } from "react";
import API from "../services/api";

function Audit() {
  const [audit, setAudit] = useState([]);
  const [stats, setStats] = useState({
    total_insert: 0,
    total_update: 0,
    total_delete: 0
  });

  const loadData = () => {
    API.get("/audit").then(res => setAudit(res.data));
    API.get("/stats").then(res => setStats(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Historique Audit</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-green-100">
          <tr>
            <th>ID</th>
            <th>Action</th>
            <th>Date</th>
            <th>Retrait</th>
            <th>Compte</th>
            <th>Client</th>
            <th>Ancien</th>
            <th>Nouveau</th>
          </tr>
        </thead>

        <tbody>
          {audit.map(a => (
            <tr key={a.id} className="text-center border-t">
              <td>{a.id}</td>
              <td>{a.type_action}</td>
              <td>{new Date(a.date_action).toLocaleString()}</td>
              <td>{a.num_retrait}</td>
              <td>{a.num_compte}</td>
              <td>{a.nomclient}</td>
              <td>{a.montant_ancien || "-"}</td>
              <td>{a.montant_nouv || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 EXACTEMENT ce que le sujet demande */}
      <div className="bg-gray-100 p-4 mt-2 rounded text-center">
        <strong>Statistiques :</strong>
        <span className="mx-3">Insertions : {Number(stats.total_insert)}</span>
        <span className="mx-3">Modifications : {Number(stats.total_update)}</span>
        <span className="mx-3">Suppressions : {Number(stats.total_delete)}</span>
      </div>
    </div>
  );
}

export default Audit;