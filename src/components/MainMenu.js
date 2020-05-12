import React from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios'

const MainMenu = () => {
    const [materials, setMaterials] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/materials')
            .then(response => {
                const sortedMaterials = response.data.sort((a, b) => (a.method > b.method) ? 1 : -1)
                setMaterials(sortedMaterials)
            })
    }, [])

    return (
        <div>
            <h2>Main Menu</h2>
            {materials.map(material => {
                return (
                    <div key={material.id}>
                        {material.name}
                    </div>
                )
            }
            )}
        </div>
    )
}

export default MainMenu