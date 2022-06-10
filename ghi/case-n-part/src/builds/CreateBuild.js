import React, { useEffect, useState } from "react";

import useApiData from "../parts/ApiFetch";

import pcCaseBlack from "../images/inner-case/pc-case-with-mobo-black.png";
import pcCasePink from "../images/inner-case/pc-case-with-mobo-pink.png";
import pcCaseGreen from "../images/inner-case/pc-case-with-mobo-green.png";

const basePath = "http://localhost:8000";

function CreateBuild() {
  const [gpuChoice, setGpuChoice] = useState([]);
  const [cpuChoice, setCpuChoice] = useState([]);
  const [psuChoice, setPsuChoice] = useState([]);
  const [ramChoice, setRamChoice] = useState([]);
  const [hddChoice, setHddChoice] = useState([]);
  const [caseColor, setCaseColor] = useState(pcCaseBlack);

  const [gpuState, setGpuState] = useState({
    manufacturer: "",
    chipset: "",
  });

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const gpus = useApiData(`${basePath}/api/gpus/`, "gpus");
  const cpus = useApiData(`${basePath}/api/cpus/`, "cpus");
  const psus = useApiData(`${basePath}/api/psus/`, "psus");
  const rams = useApiData(`${basePath}/api/rams/`, "rams");
  const hdds = useApiData(`${basePath}/api/hdds`, "hdds");
  const colors = useApiData(`${basePath}/api/color/`, "colors");
  const sizes = useApiData(`${basePath}/api/size/`, "sizes");

  const caseColors = {
    black: pcCaseBlack,
    red: pcCasePink,
    green: pcCaseGreen,
  };

<<<<<<< HEAD
  const handleGpuClick = (e) => {
    const selected = e;
    setGpuChoice(selected);
  };

  const handleCpuClick = (e) => {
    const selected = e;
    setCpuChoice(selected);
  };

  const handlePsuClick = (e) => {
    const selected = e;
    setPsuChoice(selected);
  };

  const handleRamClick = (e) => {
    const selected = e;
    setRamChoice(selected);
  };

  const handleHddClick = (e) => {
    const selected = e;
    console.log(selected);
=======
  const handleGpuClick = gpu => {
    const selected = gpu;
    setGpuChoice(selected);
  };

  const handleCpuClick = cpu => {
    const selected = cpu;
    setCpuChoice(selected);
  };

  const handlePsuClick = psu => {
    const selected = psu;
    setPsuChoice(selected);
  };

  const handleRamClick = ram => {
    const selected = ram;
    setRamChoice(selected);
  };

  const handleHddClick = hdd => {
    const selected = hdd;
>>>>>>> 75d57b6c5f0a0bace0accc822b576ed72ba9dff4
    setHddChoice(selected);
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setSelectedColor(value);
    if (value === "") {
      setCaseColor(caseColors["black"]);
    } else {
      setCaseColor(caseColors[colors[value - 1].name]);
    }
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSelectedSize(value);
  };

  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-md-center py-4 g-4 mt-4">
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            PSU
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-secondary">
                  <h5 className="modal-title" id="exampleModalLabel">
                    PSU
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body bg-secondary">
                  <table className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th>Brand</th>
                        <th>Wattage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {psus.map((psu) => {
                        return (
                          <>
                            <tr
                              key={psu["id"]}
                              onClick={() => handlePsuClick(psu)}
                            >
                              <td>{psu["brand"]}</td>
                              <td>{psu["wattage"]}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModals"
          >
            GPU
          </button>
          <div
            className="modal fade"
            id="exampleModals"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-secondary">
                  <h5 className="modal-title" id="exampleModalLabel">
                    GPU
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body bg-secondary">
                  <table className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th>Manufacturer</th>
                        <th>Chipset</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gpus.map((gpu) => {
                        return (
                          <>
                            <tr
                              key={gpu["id"]}
                              onClick={() => handleGpuClick(gpu)}
                            >
                              <td>{gpu["manufacturer"]}</td>
                              <td>{gpu["chipset"]}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModaler"
          >
            CPU
          </button>
          <div
            className="modal fade"
            id="exampleModaler"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-secondary">
                  <h5 className="modal-title" id="exampleModalLabel">
                    CPU
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body bg-secondary">
                  <table className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th>Processor</th>
                        <th>Cores</th>
                        <th>Threads</th>
                        <th>Speed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cpus.map((cpu) => {
                        return (
                          <>
                            <tr
                              key={cpu["id"]}
                              onClick={() => handleCpuClick(cpu)}
                            >
                              <td>{cpu["processor"]}</td>
                              <td>{cpu["cores"]}</td>
                              <td>{cpu["threads"]}</td>
                              <td>{cpu["speed"]}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModale"
          >
            HDD
          </button>
          <div
            className="modal fade"
            id="exampleModale"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-secondary">
                  <h5 className="modal-title" id="exampleModalLabel">
                    HDD
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body bg-secondary">
                  <table className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th>Brand</th>
                        <th>Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hdds.map((hdd) => {
                        return (
                          <>
                            <tr
                              key={hdd["id"]}
                              onClick={() => handleHddClick(hdd)}
                            >
                              <td>{hdd["brand"]}</td>
                              <td>{hdd["capacity"]}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalj"
          >
            RAM
          </button>
          <div
            className="modal fade"
            id="exampleModalj"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-secondary">
                  <h5 className="modal-title" id="exampleModalLabel">
                    RAM
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body bg-secondary">
                  <table className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th>Brand</th>
                        <th>Memory Speed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rams.map((ram) => {
                        return (
                          <>
                            <tr
                              key={ram["id"]}
                              onClick={() => handleRamClick(ram)}
                            >
                              <td>{ram["brand"]}</td>
                              <td>{ram["memory_speed"]}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-md-2 offset-md-3">
          <img src={caseColor} alt="pc case image" width="500" />
        </div>

        <div className="col-md-3 offset-md-3 ">
          <select
            onChange={handleColorChange}
            value={selectedColor}
            name="color"
            id="color"
            className="form-select w-75"
            required
          >
            <option value="">Choose a color</option>
            {colors.map((color) => {
              return (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              );
            })}
          </select>
          <select
            onChange={handleSizeChange}
            value={selectedSize}
            name="size"
            id="size"
            className="form-select w-75"
            required
          >
            <option value="">Choose a size</option>
            {sizes.map((size) => {
              return (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              );
            })}
          </select>
          <div className='col-md-3 offset-md-3'>
            <button className='btn btn-outline-primary mt-4'>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBuild;
