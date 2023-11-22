import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./Map.css";

const Map: React.FC<any> = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCgSs4v4dFmksNBhFslHzzJoadAuJuMuMA',
  });
  console.log('lat: ' + props.pointLat, ' lng: ' + props.pointLng);
  const lat = props.pointLat;
  const lng = props.pointLng;
  const center = useMemo(() => ({ lat: parseFloat(lat), lng: parseFloat(lng) }), []);
  // const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (

        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={13}
        >
          {/* <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} /> */}
          {/* <Marker position={{ lat: 18.52043, lng: 73.856743 }} /> */}
          <Marker
            position={{ lat: 18.52043, lng: 73.856743 }}
          />
        </GoogleMap>
      )}
    </div>
  );
}

export default Map;
