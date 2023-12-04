import { useParams } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Search = ()=> {
    let {meal_id, meal_type_name} = useParams();
    let [locations,setLocations] = useState([]);
    let [restaurantList, setRestaurantList] = useState([]);
    
    let getLocationList = async() =>{
      try {
        let url = `http://localhost:3030/api/get-location-list`;
        let response = await fetch(url, { method: "GET" });
        let data = await response.json();
        setLocations(data.result);
        
      } catch (error) {
  
      }
    };
    const filter = async(type, event)=>{
      let {value} = event.target;
      if (value === ""){
        setRestaurantList([]);
      }else{
        let url = "http://localhost:3030/api/filter";
        let {data}= await axios.post(url, { location : value });
        setRestaurantList(data.result);
        console.log(data.result);
//console.log(data);
      }    

    };
    useEffect(()=>{
      getLocationList();
    },[]);
  return (
    <>
      <main>
        <main>
          <Header bgColor="bg-danger" />

          <section>
            <div className="Place">{meal_type_name} Places Near-By</div>
            <article className="filter-article">
              <div className="filter-article-title">Filters</div>
              <div className="filter-article-content1">Select Location</div>
              <select className="filter-article-content2" onChange={(event)=>filter("loc", event)}>
                <option value="">select location</option>
                {
                  locations.map((loc)=>{
                    return(
                    <option key={loc._id} value={loc.location_id}>
                      {loc.name}, {loc.city}
                    </option>

                    );
                  })
                }
            
              </select>

              <div className="filter-article-title1">cousine</div>
              <input type="checkbox" />
              <label htmlFor="">North Indian</label>
              <br />
              <input type="checkbox" checked />
              <label htmlFor="">South Indian</label>
              <br />
              <input type="checkbox" checked />
              <label htmlFor="">Chines</label>
              <br />
              <input type="checkbox" />
              <label htmlFor="">Fast Food</label>
              <br />
              <input type="checkbox" />
              <label htmlFor="">Street Food</label>
              <br />

              <div className="filter-article-title2">Cost For Two</div>
              <input type="radio" name="costForTwo"/>
              <label htmlFor="">Less than 500</label>
              <br />
              <input type="radio" name="costForTwo"/>
              <label htmlFor="">500 to 1000</label>
              <br />
              <input type="radio" name="costForTwo"/>
              <label htmlFor="">1000 to 1500</label>
              <br />
              <input type="radio" name="costForTwo"/>
              <label htmlFor="">1500 to 2000</label>
              <br />
              <input type="radio" name="costForTwo"/>
              <label htmlFor="">2000+</label>
              <br />

              <div className="filter-article-title3">Sort</div>
              <input type="radio" name="Sort"/>
              <label htmlFor="">Price low to high</label>
              <br />
              <input type="radio" name="Sort"/>
              <label htmlFor="">Price high to low</label>
              <br />
            </article>
            

            <article className="filter-result1">
              <div className="filter-result1-content">
                <img src="/images/5.jpg.png" />
                <div className="filter-result1-content-title">
                  The Big Chill Cakery
                </div>
                <div className="fort">Fort</div>
                <div className="fort-address">
                  Shop 1, Plot D, Samruddhi Complex, Chincholi …
                </div>
                <div className="cost">
                  <div>CUISINES:</div>
                  <div> COST FOR TWO:</div>
                </div>
                <div className="bakery">Bakery </div>
                <div className="bakery1">₹700 </div>

              </div>
            </article>

            <article className="filter-result2">
              <div className="filter-result1-content">
                <img src="/images/5.jpg.png" />
                <div className="filter-result1-content-title">
                  The Bake Shop
                </div>
                <div className="fort">Fort</div>
                <div className="fort-address">
                  Shop 1, Plot D, Samruddhi Complex, Chincholi …
                </div>
                <div className="cost">
                  <div>CUISINES:</div>
                  <div> COST FOR TWO:</div>
                </div>
                <div className="bakery">Bakery </div>
                <div className="bakery1">₹700 </div>
              </div>
            </article>

            <div className="pagination">
              <a className="page-start">&lt;</a>
              <a className="page-1">1</a>
              <a>2</a>
              <a>3</a>
              <a>4</a>
              <a>&gt;</a>
            </div>
          </section>
        </main>
      </main>
    </>
  );
};

export default Search;