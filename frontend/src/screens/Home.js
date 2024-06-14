import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response[0],response[1]);
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{backgroundColor:'black'}}>
      <div>
        <Navbar />
      </div>
      <div
        id="carouselExampleFade" className="carousel slide carousel-fade"
        data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                style={{backgroundColor:'white'}}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://imgs.search.brave.com/NFc_YoVMSInXmIAXpLa_tpYw58bHXJLrUAHGyclZh-M/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NzQ4MTA2MC9waG90/by9idXJnZXJzLW9u/LXRoZS13b29kZW4t/Ym9hcmQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPW1VSEIx/MExDaFVZbnpnZ01u/S2dVQXpTa0ZGUGg2/MDZHTGUxZzI3U3Bj/REU9"
              className="d-block w-100"
              style={{ filter: "brightness(80%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://imgs.search.brave.com/HRKiiVuAldisPPS0e0UdQ6TLqY1oH4FYxyClRddywcI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg0/OTQ2NzAxL3Bob3Rv/L3BpenphLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz05N3Jj/MFZJaS1zM21uNHhl/NHhEeTlTLVhKX09o/Ym45MlhhRU1haUlE/X2VZPQ"
              className="d-block w-100"
              style={{ filter: "brightness(80%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://imgs.search.brave.com/B90GooAyWKlKzycoebYh4pXxi7s1OtFxhdqISNMbaIY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/My8zMC8xNS80Ny9j/aHVycm9zLTIxODg4/NzFfMTI4MC5qcGc"
              className="d-block w-100"
              style={{ filter: "brightness(80%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container ">
        {
          <div className="m-3">
            {foodCat.length > 0 ? (
              foodCat.map((data) => (
                <div key={data._id} className="row mb-3">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {foodItem.length > 0 ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      ))
                  ) : (
                    <div>No data available</div>
                  )}
                </div>
              ))
            ) : (
              <div>No data available</div>
            )}
          </div>
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
