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

    return (
        <>
            <div style={{ height:'90vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={{
                lat: 37.0,
                lng: -122.0
                }}
                zoom={10}
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
