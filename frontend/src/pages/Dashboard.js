import {useState,useEffect} from "react"
import API from "../services/api"

function Dashboard(){

const [stats,setStats] = useState({
insert:0,
update:0,
delete:0
})

const loadStats = ()=>{

API.get("/stats")
.then(res=>{

setStats({
insert:res.data.total_insert,
update:res.data.total_update,
delete:res.data.total_delete
})

})

}

useEffect(()=>{

loadStats()

const interval = setInterval(()=>{
loadStats()
},3000)

return ()=> clearInterval(interval)

},[])

return(

<div className="grid grid-cols-3 gap-6">

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">INSERT</p>
<p className="text-3xl text-green-600 font-bold">
{stats.insert}
</p>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">UPDATE</p>
<p className="text-3xl text-blue-600 font-bold">
{stats.update}
</p>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">DELETE</p>
<p className="text-3xl text-red-600 font-bold">
{stats.delete}
</p>
</div>

</div>

)

}

export default Dashboard