import React from "react";

const Loader = () => {
    return (
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase text-center">
                      Loading....
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}


export default Loader