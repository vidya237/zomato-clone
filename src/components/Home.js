import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  let [mealTypes,setMealTyes] = useState([]) ;
  let [placeHolderText,setPlaceHolderText]=useState("Get a location");
  let [locations,setLocations] = useState([]);
    let [restaurantList, setRestaurantList] = useState([]);

   let navigate = useNavigate();  
  let getMealTypes = async() => {
    try {
      let url = `http://localhost:3030/api/get-meal-type-list`;
      let response = await fetch(url, { method: "GET" });
      let data = await response.json();
      setMealTyes(data.result);
    } catch (error) {
      alert ("Server Error");
    }
   };

   let getLocationList = async() =>{
    try {
      setPlaceHolderText("getting location list..");
      setRestaurantList([]);
      let url = `http://localhost:3030/api/get-location-list`;
      let response = await fetch(url, { method: "GET" });
      let data = await response.json();
      setLocations(data.result);
      setPlaceHolderText("here is location list..");
    } catch (error) {
            setPlaceHolderText("fail to get location list, try again");

    }
  };
  let getRestaurantListByLocationId = async(id,name,city) =>{
        try {
      let url = `http://localhost:3030/api/get-restaurant-list-by-location-id/${id}`;
      let response = await fetch(url, { method: "GET" });
      let data = await response.json();
      console.log(data)
      if(data.result.length===0){
        alert('No restaurant available in this location');
      }
                  setPlaceHolderText(`${name},${city}`);
setLocations([])
setRestaurantList(data.result);

    } catch (error) {
      console.log(error)

    }
  };
  
   useEffect(()=>{
    getMealTypes();
   },[]);
  return (
    <>
     
        <section className=" background-img ">
        <Header/>
          <section className="py-2">
            <p className="brand justify-content-center m-auto fs-1 fw-bolder text-bg-white text-danger">
              e!
            </p>
            <p className="d-flex justify-content-center py-1 fw-bold text-white fs-4">
              Find the best restaurants, cafés, and bars
            </p>
          </section>

          <section className="justify-content-center d-flex py-2 ms-5 px-1  me-1 ">
            <section className="mt-3 p-0 py-1 w-100 location-list  ">
              <input
                className="p-2 bg-white mt-0 border-0 w-100 "
                type="text"
                placeholder={placeHolderText}
                readOnly
                onFocus={getLocationList}
              />
              <ul className="list-group w-100 ">
                {locations.map((loc) => {
                  return (
                    <li
                      className="list-group-item"
                      onClick={() =>
                        getRestaurantListByLocationId(
                          loc.location_id,
                          loc.name,
                          loc.city
                        )
                      }
                      key={loc._id}
                    >
                      {loc.name},{loc.city}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="w-100 location-list px-2 me-5">
              <section className=" w-100 bg-white p-2 py-1 gap-1 mb-1 mt-0 m-0 border-0 d-flex">
                <span className="icon">
                  <i className="fa fa-search p-0 mt-2" aria-hidden="true"></i>
                </span>
                <input
                  className="border-0 py-1 pe-lg-5 mt-0 px-0  "
                  type="text"
                  placeholder="Search for restaurants"
                  readOnly
                />
              </section>
              <ul className="list-group mt-1 ms-0">
                {restaurantList.map((restaurant) => {
                  return (
                    <li className="list-group-item" key={restaurant._id} onClick= { () => navigate("restaurant/"+restaurant._id)}
                    >
                     <img src={`/images/${restaurant.image}`} alt="" 
                     className="me-2"
                     style={{width:"40px",height :"40px",borderRadius :"20px"}}/> {restaurant.name},{restaurant.city}
                    </li>
                  );
                })}
              </ul>
            </section>
          </section>
        </section>

        <section className="pe-lg-4">
          <section className="pt-4 ps-lg-5">
            <h4 className="sec-2-title fw-bold">Quick Searches</h4>
            <h7 className="sec-2-sub-title">
              Discover restaurants by type of meal
            </h7>
          </section>

          <section className="gallary min-vh-100">
            <div className="container mt-2">
              <div className="row row-cols-1 row-cols-md-3 g-5 py-5">
                {mealTypes.map((value, index) => {
                  return (
                    <div
                      onClick={() => navigate(`/search/${value.meal_type}/${value.name}`)}
                      key={value._id}
                      className="col"
                    >
                      <div className=" d-flex bg-white shadow-sm h-100 w-100">
                        <img
                          className="h-100 w-50"
                          src={`/images/${value.image}`}
                          alt=""
                        />
                        <div className="justify-content-end ps-5 py-4">
                          <h3 className="lunch fw-bold fs-6">{value.name}</h3>
                          <p className="lunch-desc">{value.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </section>
     
    </>
  );
};

export default Home;

