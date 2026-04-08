import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Retraits from "./pages/Retraits";
import Audit from "./pages/Audit";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          🏦 Banque Audit
        </h1>

        {/* ✅ MENU */}
        <div className="flex justify-center gap-4 mb-8">
          <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded">
            Retraits
          </Link>
          <Link to="/audit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Audit + Stats
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Retraits />} />
          <Route path="/audit" element={<Audit />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;