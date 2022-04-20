import React from 'react'

const DestinationField = ({placeName, setplaceName}) => {
    return (
        <div className="form-outline mb-4">
            <input
                type="text"
                id="placeName"
                className="form-control form-control-lg"
                placeholder="Please enter the destination name"
                value={placeName}
                onChange={(e) => setplaceName(e.target.value)}
            />
        </div>
    )
}

export default DestinationField
