import GoogleMapReact from 'google-map-react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export default function Explore() {
    const [filters, setFilters] = useState({
        mammals: true,
        birds: false,
        amphibians: false
    });

    const toggleFilterActive = ({target}) => {
        const taxa = target.getAttribute('taxa');
      setFilters((prevFilters) => (
        {
          ...prevFilters,
          [taxa]: !prevFilters[taxa]
      }));
    };

    const onGoogleApiLoaded = (map, maps) => {
        var triangleCoords = [
            { lat: 25.774, lng: -80.19 },
            { lat: 18.466, lng: -66.118 },
            { lat: 32.321, lng: -64.757 },
            { lat: 25.774, lng: -80.19 }
          ];
        
          // Construct the polygon.
          var bermudaTriangle = new maps.Polygon({
            paths: triangleCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35
          });
          bermudaTriangle.setMap(map);
    };

    return (
        <>
            <div style={{ height:'90vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={{ lat: 24.886, lng: -70.268 }}
                zoom={5}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
            >
            </GoogleMapReact>
            </div>
            <ButtonGroup toggle>
                <Button variant={filters['mammals'] ? 'primary' : 'outline-primary'} taxa={'mammals'} onClick={toggleFilterActive}>Mammals</Button>
                <Button variant={filters['birds'] ? 'primary' : 'outline-primary'} taxa={'birds'} onClick={toggleFilterActive}>Birds</Button>
                <Button variant={filters['amphibians'] ? 'primary' : 'outline-primary'} taxa={'amphibians'} onClick={toggleFilterActive}>Amphibians</Button>
            </ButtonGroup>
        </>
    );
}
