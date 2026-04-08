import { Link } from "react-router-dom";

function Navbar() {
return(

<nav className="bg-green-700 text-white p-4 flex gap-6">

<Link to="/" className="hover:text-green-200">
Dashboard
</Link>

<Link to="/retraits" className="hover:text-green-200">
Retraits
</Link>

<Link to="/audit" className="hover:text-green-200">
Audit
</Link>

</nav>

)
}

export default Navbar;