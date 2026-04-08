import { useState, useEffect } from "react";
import API from "../services/api";

function Retraits() {
  const [retraits, setRetraits] = useState([]);
  const [form, setForm] = useState({ num_compte: "", num_cheque: "", montant: "" });
  const [editId, setEditId] = useState(null);

  const loadRetraits = () => {
    API.get("/retraits").then(res => setRetraits(res.data));
  };

  useEffect(() => { loadRetraits(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      // Modification
      API.put(`/retraits/${editId}`, { montant: form.montant })
         .then(() => { setEditId(null); setForm({ num_compte: "", num_cheque: "", montant: "" }); loadRetraits(); });
    } else {
      // Ajout
      API.post("/retraits", form)
         .then(() => { setForm({ num_compte: "", num_cheque: "", montant: "" }); loadRetraits(); });
    }
  };

  const handleEdit = r => {
    setEditId(r.num_retrait);
    setForm({ num_compte: r.num_compte, num_cheque: r.num_cheque, montant: r.montant });
  };

  const handleDelete = id => {
    API.delete(`/retraits/${id}`).then(() => loadRetraits());
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gestion des retraits</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input name="num_compte" placeholder="Num Compte" value={form.num_compte} onChange={handleChange} disabled={!!editId} />
        {!editId && <input name="num_cheque" placeholder="Num Chèque" value={form.num_cheque} onChange={handleChange} />}
        <input name="montant" placeholder="Montant" value={form.montant} onChange={handleChange} />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* Table des retraits */}
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
              <td>{r.solde_initial}</td>
              <td className="text-red-600">-{r.montant}</td>
              <td>{r.solde_apres}</td>
              <td className="flex gap-2 justify-center">
                <button onClick={() => handleEdit(r)} className="bg-blue-500 text-white px-3 py-1 rounded">Modifier</button>
                <button onClick={() => handleDelete(r.num_retrait)} className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Retraits;