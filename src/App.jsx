import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [meatItems, setMeatItems] = useState([])

    useEffect(() => {
        fetch("http://localhost:5123/api/meatitems")
            .then(response => response.json())
            .then(data => setMeatItems(data))
            .catch(error => console.error("Error fetching data", error))
    })
  return (
      <div>
        <h1>Meat Inventory</h1>
        <ul>
            {meatItems.map(item => (
                <li key={item.id}>
                    {item.type} - {item.cut} - {item.weight}g - ({item.strage})
                </li>
            ))}
        </ul>
      </div>
  )
}

export default App
