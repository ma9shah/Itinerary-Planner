import React from "react";
const DatePicker = ({ state, newState }) => {
    // console.log(state, newState)
    return (
        <div className="col-6">
            {/* <div className="form-outline mb-4"> */}
                <input
                    className="datepicker-inner"
                    type="date"
                    id="startDate"
                    // className="form-control form-control-lg"
                    placeholder="Start Date"
                    value={state}
                    onChange={(e) => {
                        newState(e.target.value)
                        console.log(state)
                    }}
                />
            </div>
        // </div>
    )
}


export default DatePicker