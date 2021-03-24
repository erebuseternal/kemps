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
            {
              this.props.polygons.map(
                polygon => <Polygon
                  path={polygon["polygon"]}
                  onClick={this.props.polygonFunc}
                  polygon_id={polygon["id"]}
                  polygon_parent={polygon["parent_region"]}
                  polygon_children={("child_regions" in polygon) ? polygon["child_regions"] : []}
                  key={polygon["id"]}
                ></Polygon>
              )
            }
            </Map>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: REACT_APP_GOOGLE_MAPS_API_KEY
  })(MapContainer);