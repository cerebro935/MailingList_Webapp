import React, {createRef, useEffect, useState} from 'react';
import './App.css';
import { Nav,Navbar, NavDropdown, Form, Button, FormControl, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBDataTable } from 'mdbreact';
import rd3 from 'react-d3-library'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'
import Geocode from 'react-geocode';
import axios from "axios";



export default function App() {

Geocode.setApiKey("");
Geocode.setLanguage("en");
Geocode.setRegion("us");

var addressData;
var addressString;
var temp;
var names = [];;
var markers = [];
var mark = null;
const [data, setData] = useState([]);
const [geo, setGeo] = useState([]);

const formatdata = {
  columns: [
    {
      label: 'ID',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Street',
      field: 'street',
      sort: 'asc',
      width: 150
    },
    {
      label: 'City',
      field: 'city',
      sort: 'asc',
      width: 150
    },
    {
      label: 'State',
      field: 'state',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Postal Code',
      field: 'postalCode',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Date',
      field: 'date',
      sort: 'asc',
      width: 150
    }


  ],
  rows: data
};


useEffect(() => {
  axios
    .get("http://172.119.206.111/getAllTables.php")
    .then(result => setData(result.data));
}, []);

useEffect(() => {
data.map(address => (
      names.push(address.name),
      addressString = (address.street).concat(' ', address.city, ' ', address.state),
      Geocode.fromAddress(addressString)
      .then(response => {
        temp = response.results[0].geometry.location
        console.log(address.name)
        console.log(temp)
        markers.push([temp.lat, temp.lng])
      },
      error => {
         console.error(error)
      })
));
markers = [];
});

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">A Million Thanks</Navbar.Brand>
      </Navbar>
      <br/>
      <MDBDataTable
      striped
      bordered
      hover
      theadColor="cyan lighten-5" 
      data={formatdata}
    />        

 <script>
 </script>

   <div>
    <button onClick={()=>setGeo(markers)}>Update Map</button>
    <Map center={[39.50, -98.35]} zoom={4.5}>
      <TileLayer
        attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
         />
        {geo.map((position, idx) =>
           <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span> {names[idx]} </span>
            </Popup>
          </Marker>
         )}
    </Map>
  </div>
</div>
  );
}
