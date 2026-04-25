import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const userIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


function RecenterMap({ position }) {
  const map = useMap();


  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [position, map]);


  return null;
}


export default function LiveMap() {
  const [position, setPosition] = useState(null);


  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }


    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Location error:", err);
        alert("Unable to retrieve your location");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );


    return () => navigator.geolocation.clearWatch(watchId);
  }, []);


  if (!position) {
    return (
      <div style={{ color: "white", padding: "20px" }}>
        Getting live location...
      </div>
    );
  }


  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "420px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />


      <RecenterMap position={position} />


      <Marker position={position} icon={userIcon}>
        <Popup>Your Live Location</Popup>
      </Marker>


      <Circle center={position} radius={40} />


      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 1000,
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "4px 10px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        Sumit Kumar
      </div>cd DhruvTara--main
    </MapContainer>
  );
}



