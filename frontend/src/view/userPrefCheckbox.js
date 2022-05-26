import React, {useState} from 'react'

export default function UserPrefCheckbox({label, state, setState}) {

  return (
    <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                    checked={state} value={state}
                    onChange={e => {
                        setState((state) => {
                            if (state) {
                                return 0
                            } else {
                                return 1 }
                        })
                    }} />
                <label className="form-check-label" forhtml="flexCheckDefault">
                    {label}
                </label>
                </div>
  )
}
