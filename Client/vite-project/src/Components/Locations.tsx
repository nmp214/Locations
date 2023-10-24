import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { getAll, getItem } from "../Services/service";
import { endPoint } from "../Services/config";
import LocationCard from "./LocationCard";
import { isToken } from "../Services/cookies";

const Locations: React.FC = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    // const [show, setShow] = useState(false);
    const [locations, setLocations] = useState([{ id: 0, name: '', address: '', image: '', imageUrl: '', description: '', area: '', likes: 0, date: null, imagesList: []}]);

    getItem(`${endPoint}/location/isAdmin`).then(res => {
        setIsAdmin(res.data);
        console.log("isAdmin? ", res.data);
    });

    const showAllLocations = () => {
        // setShow(true);
        getAll(`${endPoint}/location/getLocations`).then((result) => {
            console.log(result);
            setLocations(result.data);
        });
    }
    return (<>
        <h1>רשימת לוקיישנים</h1>
       {isToken() && <button onClick={() => navigate('/Add')}>הוספת לוקיישן</button>
       || <button disabled>הוספת לוקיישן</button>}
           <br />  <br />
        {isAdmin && <button onClick={showAllLocations}>רשימה זמנית  </button> || ''}
        {locations[0].id != 0 && locations.map((location, index) =>
            <LocationCard key={index} isTemp={true} location={location}/>)}
                <br />

        <Filter />


    </>);
}

export default Locations;