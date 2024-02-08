import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const Home = () => {

  return (
    <div className="d-flex flex-column w-100">
      {/* header */}
      {/* <div className="d-flex justify-content-center align-content-center p-2 border-bottom bg-danger text-white">
        <h3>Journeys</h3>
      </div> */}
      {/* header */}
      <div className="d-flex justify-content-between align-content-center p-2 border bg-danger-subtle">
        <button className="btn btn-secondary" disabled>◀</button>
        <h4 className="d-flex justify-content-center m-auto">Today</h4>
        <button className="btn btn-secondary">▶</button>
      </div>

      {/* cards (data) */}
      <div className="journey-container p-1 border">


        {/* card */}
        <div className="journey-card card-selected">
          {/* card header */}
          <div className="journey-card-header border-bottom p-1">
            <span>8:00 - 8:15</span>
          </div>
          {/* card body */}
          <div className="d-flex flex-wrap align-content-center p-1 border-bottom gap-2">
            <div className="d-flex flex-column bg-light p-1 gap-1 mini-card">
              <span className="p-1">Passengers</span>
              <span className="ms-auto p-1">20 / 20</span>
            </div>
            <div className="d-flex flex-column flex-wrap bg-light p-1 gap-1 mini-card">
              <span className="p-1">Driver</span>
              <span className="ms-auto p-1">Samir masri (You)</span>
            </div>
          </div>
          {/* card footer */}
          <div className="d-flex justify-content-end gap-1 p-1">
            <button className="btn btn-primary">View details</button>
            <button className="btn btn-danger" disabled>Take</button>
          </div>
        </div>
        {/*  */}

        {/* card */}
        <div className="journey-card">
          {/* card header */}
          <div className="journey-card-header border-bottom p-1">
            <span>8:00 - 8:15</span>
          </div>
          {/* card body */}
          <div className="d-flex flex-wrap align-content-center p-1 border-bottom gap-2">
            <div className="d-flex flex-column bg-light p-1 gap-1 mini-card">
              <span className="p-1">Passengers</span>
              <span className="ms-auto p-1">20 / 20</span>
            </div>
            <div className="d-flex flex-column flex-wrap bg-light p-1 gap-1 mini-card">
              <span className="p-1">Driver</span>
              <span className="ms-auto p-1">N/N</span>
            </div>
          </div>
          {/* card footer */}
          <div className="d-flex justify-content-end gap-1 p-1">
            <button className="btn btn-primary">View details</button>
            <button className="btn btn-danger">Take</button>
          </div>
        </div>
        {/*  */}


        {/* card */}
        <div className="journey-card card-muted">
          {/* card header */}
          <div className="journey-card-header border-bottom p-1">
            <span>8:00 - 8:15</span>
          </div>
          {/* card body */}
          <div className="d-flex flex-wrap align-content-center p-1 border-bottom gap-2">
            <div className="d-flex flex-column bg-light p-1 gap-1 mini-card">
              <span className="p-1">Passengers</span>
              <span className="ms-auto p-1">20 / 20</span>
            </div>
            <div className="d-flex flex-column flex-wrap bg-light p-1 gap-1 mini-card">
              <span className="p-1">Driver</span>
              <span className="ms-auto p-1">Ahmad Mohsen</span>
            </div>
          </div>
          {/* card footer */}
          <div className="d-flex justify-content-end gap-1 p-1">
            <button className="btn btn-primary">View details</button>
            <button className="btn btn-danger" disabled>Take</button>
          </div>
        </div>
        {/*  */}
      </div>

    </div>
  );
};
export default Home;
