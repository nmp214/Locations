import React, { useState } from 'react';
import { getToHome } from '../Services/service';
import { endPoint } from '../Services/config';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import LocationCard from './LocationCard';
import img from '../assets/location.png';

const Home: React.FC = () => {
  // const [locations, setLocations] = useState([{ id: 0, name: '', address: '', image: '', description: '', likes: 0 }]);
  const [popularLocations, setPopularLocations] = useState([{ id: 0, name: '', address: '', image: '', imageUrl: '', description: '', area: '', likes: 0, date: null, imagesList: [''] }]);
  const [lastLocations, setLastLocations] = useState([{ id: 0, name: '', address: '', image: '', imageUrl: '', description: '', area: '', likes: 0, date: null, imagesList: [''] }]);
  const last = "last";
  const likes = "likes";
  const setLocations = () => {
    console.log('setLocations');
    getToHome(last, `${endPoint}/location/getToHome`)
      .then(response => {
        console.log(response.data);
        setLastLocations(response.data);
      })
      .catch(err => console.log(err));
    getToHome(likes, `${endPoint}/location/getToHome`)
      .then(response => {
        console.log(response.data);
        setPopularLocations(response.data);
      });
  }

  setLocations();
  return (
    <div>

      <br /><br />
      {/* <h1>ברוכים הבאים לאתר הלוקיישנים </h1> */}
      <CardMedia
        component="img"
        height="300"
        width="180"
        // image="https://firebasestorage.googleapis.com/v0/b/imglocations.appspot.com/o/images%2Flocation.png?alt=media&token=aaeec466-014d-4c85-8d75-48e187790da0"
        image={img}
        alt="התמונה לא עלתה"
      />
      <div>
        <h2>הלוקיישנים האחרונים</h2>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {lastLocations[0].id != 0 && lastLocations.map((location, index) => (
                <LocationCard key={index} location={location} />
              )) || ''}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div>
        <h2>הלוקיישנים הפופולרים</h2>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {popularLocations[0].id != 0 && popularLocations.map((location, index) => (
                <LocationCard key={index} isTemp={false} location={location}/>
              )) || ''}
              {/* id={location.id} name={location.name} address={location.address} image={location.image} imageUrl={location.imageUrl} description={location.description} area={location.area} likes={location.likes} date={new Date}  */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home