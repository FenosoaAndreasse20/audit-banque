import { useState, useEffect } from "react";
import API from "../services/api";

function Retraits() {
  const [retraits, setRetraits] = useState([]);

const loadRetraits = () => {
  API.get("/retraits").then(res => {
    console.log(res.data);
    setRetraits(res.data);
  });
};

  useEffect(() => {
    loadRetraits();
  }, []);

  const supprimerRetrait = id => {
    API.delete("/retraits/" + id).then(() => loadRetraits());
  };

  const modifierRetrait = r => {
    // à compléter si tu veux modifier
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gestion des retraits</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-green-100">
          <tr>
            <th>Retrait</th>
            <th>Compte</th>
            <th>Client</th>
            <th>Solde actuel</th>
            <th>Retrait</th>
            <th>Solde après</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {retraits.map(r => (
            <tr key={r.num_retrait} className="text-center border-t">
              <td>{r.num_retrait}</td>
              <td>{r.num_compte}</td>
              <td>{r.nomclient}</td>
              <td>{r.solde}</td>

              {/* ✅ retrait en négatif */}
              <td className="text-red-600">
                -{r.montant}
              </td>

              {/* ✅ déjà calculé par SQL */}
              <td>{r.solde_apres}</td>

              <td className="flex gap-2 justify-center">
                <button
                  onClick={() => modifierRetrait(r)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Modifier
                </button>

                <button
                  onClick={() => supprimerRetrait(r.num_retrait)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Retraits;