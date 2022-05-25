import React, { useState, useEffect } from 'react'

const categories = {
    // historical: ["museum", "city_hall"],
    museum: ["museum"],
    cultural: ["art_gallery", "casino", "jewelry_store"],
    religious: ["hindu_temple", "church", "mosque"],
    nature: ["park", "zoo"],
    indoors: ["bakery", "cafe", "art_gallery", "bar"],
    thrill: ["amusement"],
    avoid_touristy: ["tourist_attraction"]
}
// label: [actual]

export default function UserPrefs() {
    const [museum, setMuseum] = useState(0);

    useEffect(()=>{
        const fetchData = async () => {
            // I'm sure there's a GET request way to do this but I can't find a way to send the email param
            const response = await fetch('http://localhost:3001/retrievePrefs/'+localStorage.getItem('email'))
            const data = await response.json()
            // await delay(2000)
            if (data.prev === false){
                setMuseum(0)
            }
            else {
                setMuseum(data.prev)
            }
        }

        fetchData()
            .then(() => {
                console.log("Prefs")
            })
            .catch(console.error);
    }, [])
            
    
    
    async function updatePrefs(e) {
        console.log("Updating Prefs, POST req initiated")
        e.preventDefault()
        const response = await fetch('http://localhost:3001/updatePrefs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: localStorage.getItem('email'),
            newPrefs: museum
          }),
        })
        const data = await response.json()
        console.log(data)
      }

    return (
        <>
            {museum}
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                    checked={museum}
                    value={museum} 
                    onChange={e => {
                        setMuseum((museum)=>!museum)
                    }} />
                <label className="form-check-label" forhtml="flexCheckDefault">
                    museum
                </label>
            </div>
                
            <button onClick={updatePrefs}>
                    UPDATE PREFS
            </button>

        </>
    )
}
