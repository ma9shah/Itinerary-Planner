import React from "react";
// const messages = ["crunching numbers", "optimizing distances...", "loading..."]
const messages = ["Loading..."]
const Loader = () => {
  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card-body p-md-5 text-black">
            <h3 className="mb-5 text-center">
              <div className="spinner-border text-warning border-2" role="status">
                <span className="sr-only">loading...</span>
              </div>
              <br/>
              <div className="p-4 font-weight-light">
                {messages[Math.floor(Math.random() * messages.length)]}
              </div>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Loader