import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import DImage from "../img/profilePlaceholder.png";

const JourneyDetails = () => {

  return (
    <div className="d-flex flex-column w-100">
      <div className="d-flex justify-content-center align-content-center p-2 gap-2 border bg-danger text-white">
        <h3><b>Journey Detail</b></h3>
      </div>

      <div className="d-flex align-items-center justify-content-between gap-md-1 flex-wrap">
        <div className="d-flex flex-column justify-content-center bg-light gap-2 border mini-card card-1">
          <h5 className="border-bottom p-1"><b>from</b></h5>
          <h6 className="p-1 ms-auto">Arde, Tripoli, Zgharta</h6>
        </div>

        <div className="d-flex flex-column justify-content-center bg-light gap-2 border mini-card">
          <h5 className="border-bottom p-1"><b>to</b></h5>
          <h6 className="p-1 ms-auto">LIU, LU</h6>
        </div>

        <div className="d-flex flex-column justify-content-center bg-light gap-2 border mini-card">
          <h5 className="border-bottom p-1"><b>bus</b></h5>
          <h6 className="p-1 ms-auto">ST 2</h6>
        </div>

        <div className="d-flex flex-column justify-content-center bg-light gap-2 border mini-card">
          <h5 className="border-bottom p-1"><b>students</b></h5>
          <h6 className="p-1 ms-auto">20 / 20</h6>
        </div>

        <div className="d-flex flex-column justify-content-center bg-light gap-2 border mini-card">
          <h5 className="border-bottom p-1"><b>driver</b></h5>
          <h6 className="p-1 ms-auto">Ahmad masri</h6>
        </div>
      </div>

      <div className="d-flex flex-column border">
        <div className="d-flex justify-content-center bg-danger border-bottom text-white overflow-hidden">
          <h4 className="p-2"><b>Students</b></h4>
        </div>
        {/*  */}
        <div className="d-flex border-bottom">
          <div className="d-flex bg-danger text-white">
            <h5 className="align-self-center p-1">LU</h5>
          </div>
          <div className="d-flex justify-content-center flex-1 p-2">
            <h6 className="text-muted">No students to LU</h6>
          </div>
        </div>
        {/*  */}
        <div className="d-flex border-bottom">
          <div className="d-flex bg-danger text-white">
            <h5 className="align-self-center p-1">LIU</h5>
          </div>
          <div className="students-container p-2 gap-2">
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
            {/* student card */}
            <div style={{ borderRadius: "30px" }} className="d-flex align-items-center gap-1 bg-light p-1 shadow">
              {/* card image */}
              <div className="image p-1">
                <img className="img-fluid rounded-circle" src={DImage} alt="tst" width={"50"} height={"50"} />
              </div>
              {/* card content */}
              <div className="d-flex flex-column flex-1 pe-2">
                <h6 className="p-1 border-bottom">Ali masri</h6>
                <span className="text-muted text-center">🗺 Arde</span>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default JourneyDetails;
