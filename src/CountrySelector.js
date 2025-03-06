import React, { useEffect, useState } from "react";
import axios from "axios";


function CountrySelector (){

    const [contries,setCountries] = useState([]);
    const [states,setStates] = useState([]);
    const [cities,setCities] = useState([]);

    const [selectedStates,setSelectedStates] = useState("");
    const [selectedCountries,setSelectedCountries] = useState("");
    const [selectedCities,setSelectedCities] = useState("");

    useEffect(()=>{
        axios.get("https://crio-location-selector.onrender.com/countries")
        .then((response) => {
            setCountries(response.data)
            console.log(response.data);
        })
            
        .catch((error) => console.error("Error fetching data:", error));
    },[])

    useEffect(()=>{
        if(selectedCountries){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountries}/states`)
            .then((response)=> 
            {
                setStates(response.data);
                setSelectedStates("");
                setCities([]);
                setSelectedCities("")
                console.log(response.data)
            })
            .catch((error) => console.error("Error fetching states:", error));
        }


    },[selectedCountries])

    useEffect(()=>{
        if(selectedCountries && selectedStates){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountries}/state=${selectedStates}/cities`)
            .then((response)=> 
          {
                setCities(response.data);
                selectedCities("")
                console.log(response.data)
            })
            .catch((error) => console.error("Error fetching cities:", error));
        }

    },[selectedCountries,selectedStates])




    return (
        <>
        <h1>Select Location</h1>

        <select
         value={selectedCountries}
         onChange={(e) => setSelectedCountries(e.target.value)}
         >
            <option value="" disabled>
                Select Country
            </option>
            {contries.map((country)=>(
                <option key={country} value={country}>
                {country}
                </option>
            ))}
         </select>

         <select
         value={selectedStates}
         onChange={(e) => setSelectedStates(e.target.value)}
         >
            <option value="" disabled>
                Select State
            </option>
            {states.map((state)=>(
                <option key={state} value={state}>
                {state}
                </option>
            ))}
         </select>


         <select
         value={selectedCities}
         onChange={(e) => setSelectedCities(e.target.value)}
         >
            <option value="" disabled>
                Select City
            </option>
            {cities.map((city)=>(
                <option key={city} value={city}>
                {city}
                </option>
            ))}
         </select>

         {selectedCities && (<h2><span><strong>You selected </strong></span><span style={{fontSize:"40px"}}>{selectedCities}</span>,
         <span style={{
             color: "#777"
         }}>{" "}
            {selectedStates},{selectedCountries}</span> 
            </h2>
        )}   

        </>
    )

}

export default CountrySelector;