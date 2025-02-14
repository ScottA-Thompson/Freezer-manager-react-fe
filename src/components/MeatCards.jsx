import { useState, useEffect } from "react";

const storageLabels = {
    0: "Freezer",
    1: "Fridge",
    2: "Consumed"
};

function MeatCards() {
    const [meatItems, setMeatItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5123/api/meatitems")
        .then(response => response.json())
        .then(data => setMeatItems(data))
        .catch(error => console.error("Error fetching data:", error));
    }, []);

    const freezerItems = meatItems.filter(item => item.storage === 0);
    console.log(meatItems);
    console.log(freezerItems);
    const fridgeItems = meatItems.filter(item => item.storage === 1);
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Meat Inventory</h1>
            <div style={styles.gridContainer}>
                <div style={styles.section}>
                <h2 style={styles.sectionTitle}> Freezer </h2>
                    <div style={styles.grid}>
                        {freezerItems.map((item)=> (
                            <div key={item.id} style={styles.card}>
                                <h3>{item.type} - {item.cut}</h3>
                                <p><strong>Weight:</strong> {item.weight}</p>
                                <p><strong>Date Added:</strong> {new Date(item.dateAdded).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Fridge </h2>
                    <div style={styles.grid}>
                        {fridgeItems.map((item)=> (
                            <div key={item.id} style={styles.card}>
                                <h3>{item.type} - {item.cut}</h3>
                                <p><strong>Weight:</strong> {item.weight}</p>
                                <p><strong>Date Added:</strong> {new Date(item.dateAdded).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                    </div>
            </div>
        </div>
    )
}

const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const styles = {
    container: {
        padding:"10px",
        textAlign: "center",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "15px",
        color: prefersDarkMode ? "#fff" : "#222",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(autofit, minmax(180px, 1fr))",
        gap: "8px",
    },
    card: {
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "6px",
        boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: prefersDarkMode ? "#333" : "#fff", // Dark mode: dark cards, Light mode: white cards
        color: prefersDarkMode ? "#fff" : "#222", // Text adapts based on mode
        fontSize: "14px",
        textAlign: "left",
    },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
        textAlign: "left",
        color: prefersDarkMode ? "#fff" : "#222",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
        alignItems: "start",
    },
    section: {
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "6px",
        backgroundColor: prefersDarkMode ? "#444" : "#f9f9f9",
        minHeight: "450px",
        overflowY: "auto",
    },
};

export default MeatCards;
