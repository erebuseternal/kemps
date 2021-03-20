import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const mapStyles = {
    width: '100%',
    height: '100%'
  };
  
class MapContainer extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
      return (
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={
            {
              lat: 37,
              lng: -122
            }
          }
        >
            <Polygon
                path={this.props.polygons[0]}
                onClick={this.props.polygonFunc}
            ></Polygon>
            </Map>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: REACT_APP_GOOGLE_MAPS_API_KEY
  })(MapContainer);