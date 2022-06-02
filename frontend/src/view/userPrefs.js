import React, { useState, useEffect } from 'react'
import UserPrefCheckbox from './userPrefCheckbox';
import NavBar from './NavBar'

// label: [actual]
const categories = {
    // historical: ["museum", "city_hall"],
    museum: ["museum"],
    cultural: ["art_gallery", "casino", "landmark", "town_square"],
    religious: ["hindu_temple", "church", "mosque", "place_of_worship"],
    nature: ["park", "zoo", "natural_feature"],
    indoors: ["bakery", "cafe", "art_gallery", "bar"],
    thrill: ["amusement"],
    avoidTourists: ["tourist_attraction"]
}


export default function UserPrefs() {
    const [museum, setMuseum] = useState(0);
    const [cultural, setCultural] = useState(0);
    const [religious, setReligious] = useState(0);
    const [nature, setNature] = useState(0);
    const [indoors, setIndoors] = useState(0);
    const [thrill, setThrill] = useState(0);
    const [avoidTourists, setAvoidTourists] = useState(0);
    const [walkable, setWalkable] = useState(0);
    let allStates = [museum, cultural, religious, nature, indoors, thrill, avoidTourists, walkable]
    let preferencesList = []

    useEffect(() => {
        preferencesList = []
        if (museum) {
            preferencesList.push(categories["museum"])
        }
        if (cultural) {
            preferencesList.push(categories["cultural"])
            preferencesList.push("cultural")
        }
        if (religious) {
            preferencesList.push(categories["religious"])
            preferencesList.push("religious")
        }
        if (nature) {
            preferencesList.push(categories["nature"])
            preferencesList.push("nature")
        }
        if (indoors) {
            preferencesList.push(categories["indoors"])
            preferencesList.push("indoors")
        }
        if (walkable) {
            preferencesList.push("walkable")
        }
        if (avoidTourists) {
            preferencesList.push(categories["avoidTourists"])
        }
        preferencesList = preferencesList.flat()
        console.log(preferencesList)
    }, [museum, cultural, religious, nature, indoors, thrill, avoidTourists, walkable])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/retrievePrefs/' + localStorage.getItem('email'))
            const data = await response.json()
            if (data.prev.includes("museum")) {
                setMuseum(1)
            }
            if (data.prev.includes("cultural")) {
                setCultural(1)
            }
            if (data.prev.includes("walkable")) {
                setWalkable(1)
            }
            if (data.prev.includes("religious")) {
                setReligious(1)
            }
            if (data.prev.includes("indoors")) {
                setIndoors(1)
            }
            if (data.prev.includes("nature")) {
                setNature(1)
            }
            if (data.prev.includes("tourist_attraction")) {
                setAvoidTourists(1)
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
                newPrefs: preferencesList
            }),
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <>  
            <NavBar></NavBar>
            <UserPrefCheckbox label={"Museum"} state={museum} setState={setMuseum}></UserPrefCheckbox>
            <UserPrefCheckbox label={"Cultural"} state={cultural} setState={setCultural}></UserPrefCheckbox>
            <UserPrefCheckbox label={"Religious"} state={religious} setState={setReligious}></UserPrefCheckbox>
            <UserPrefCheckbox label={"Nature"} state={nature} setState={setNature}></UserPrefCheckbox>
            <UserPrefCheckbox label={"Indoor Places"} state={indoors} setState={setIndoors}></UserPrefCheckbox>
            <UserPrefCheckbox label={"Walkable"} state={walkable} setState={setWalkable}></UserPrefCheckbox>
            <UserPrefCheckbox label={"Avoid Typical Tourist Places"} state={avoidTourists} setState={setAvoidTourists}></UserPrefCheckbox>
            <br></br>
            <button onClick={updatePrefs}>
                UPDATE PREFS
            </button>

        </>
    )
}
