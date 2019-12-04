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
var marker;
var temp;
var markers = [];
var position = [39.50, -98.35];
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

function addMarkers() {
 for(var index = 0; index < addressData.length; index++){
  var addressString = (addressData[index].street).concat(' ', addressData[index].city, ' ', addressData[index].state);
  console.log(addressString);
  Geocode.fromAddress(addressString)
   .then(response => {
      markers.push(response.results[0].geometry.location);
    },
    error => {
       console.error(error);
    });
 }
}

function getCoords(address) {
  addressString = (address.street).concat(' ', address.city, ' ', address.state);
  Geocode.fromAddress(addressString)
        .then(response => {
        setGeo(response.results[0].geometry.location);
      },
     error => {
         console.error(error);
     });
}

function go() {
data.map(address => (
      marker = {lat: 39.5, lng: -98.53},
      addressString = (address.street).concat(' ', address.city, ' ', address.state),
      Geocode.fromAddress(addressString)
        .then(response => {
        temp = response.results[0].geometry.location
        console.log(address.name)
        console.log(temp)
      },
      error => {
         console.error(error)
      }),
      //console.log(marker),
      mark = (<Marker position={[marker.lat, marker.lng]}>
        <Popup>
          Test pop-up
        </Popup>
      </Marker>)
))
}


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
    <button onClick={go}>Get All Addresses</button>
    <Map center={[39.50, -98.35]} zoom={4.5}>
      <TileLayer
        attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
         />
       <button onClick={go}>Get All Addresses</button>
        {mark}
    </Map>
  </div>
</div>
  );
}
