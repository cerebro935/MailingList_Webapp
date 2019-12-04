import React, {createRef, useEffect, useState} from 'react';
import './App.css';
import { Nav,Navbar, NavDropdown, Form, Button, FormControl, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import Geocode from 'react-geocode';
import axios from "axios";
import Graph from "./Graph";


export default function App() {

Geocode.setApiKey("");
Geocode.setLanguage("en");
Geocode.setRegion("us");
    const randomData = () =>
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
    var datas=[{
        color: "light-blue",
        values: randomData()
    }];




var addressData;
var addressString;
var marker;
var temp;
var markers = [];
var position = [39.50, -98.35];
var mark = null;
const [yearlydatas, setDatas] = useState([{
    color: "light-blue",
    values: randomData()
}]);

const [data, setData] = useState([]);
const [geo, setGeo] = useState([]);
var yearlydata = [0,0,0,0,0,0,0,0,0,0,0,0];

useEffect(() => {
  axios
    .get("http://172.119.206.111/getAllTables.php")
    .then(function(response){
        setData(response.data);
        console.log(response.data[0].date);
        var date = new Date(response.data[0].date);
        console.log(date.getMonth());
        for(let i = 0; i < response.data.length; i++){
            date = new Date(response.data[i].date);
            yearlydata[date.getMonth()]++;
        }
        var tempdata = [{
            color: "light-blue",
            values: yearlydata
        }];
        setDatas(tempdata);
        console.log("datas");
        console.log(tempdata);
        console.log(yearlydatas);
    })
      .catch(function(error){
          console.log(error);
      });
  console.log("hello");
  console.log(data);
  console.log(yearlydata);
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
        temp = response.results[0].geometry.location;
        console.log(address.name);
        console.log(temp);
      },
      error => {
         console.error(error);
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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">A Million Thanks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
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
        <div id="my_scatter">
            <Graph
                title="Letters Received by Month"
                type="bar"
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: yearlydatas
                }}
                onSelect={a => console.log(a.index)}
            />
        </div>
      <Table responsive variant="dark" striped bordered hover>
          <thead>
            <tr>
              <th>Entry</th>
              <th>Name</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Postal Code</th>
              <th>Date Received</th>
               </tr>
            </thead>
            <tbody>
              {data.map(address => (
                <tr>
                    <td>{address.id}</td>
                    <td>{address.name}</td>
                    <td>{address.street}</td>
                    <td>{address.city}</td>
                    <td>{address.state}</td>
                    <td>{address.postalCode}</td>
                    <td>{address.date}</td>
                </tr>
                  ))}
            </tbody>
        </Table>


</div>
  );
}
