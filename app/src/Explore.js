import GoogleApiWrapper from './Map';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';



  export default function Explore() {
    const [filters, setFilters] = useState({
        mammals: true,
        birds: false,
        amphibians: false
    });

    const [toggle, setToggle] = useState(false)

    const toggleFilterActive = ({target}) => {
        const taxa = target.getAttribute('taxa');
      setFilters((prevFilters) => (
        {
          ...prevFilters,
          [taxa]: !prevFilters[taxa]
      }));
    };

    const toggleFunc = () => {
        console.log(toggle);
        setToggle((prevToggle) => (!prevToggle));
    }

    return (
        <>
            <div>
            <GoogleApiWrapper polygons={[[
                    {lat: 37, lng:-122},
                    {lat: 36.7, lng:-122.5},
                    {lat: 36.7, lng:-121.5},
                    {lat: 37, lng:-122}
                ]]}  polygonFunc={toggleFunc}/>
            </div>
            <ButtonGroup toggle>
                <Button variant={filters['mammals'] ? 'primary' : 'outline-primary'} taxa={'mammals'} onClick={toggleFilterActive}>Mammals</Button>
                <Button variant={filters['birds'] ? 'primary' : 'outline-primary'} taxa={'birds'} onClick={toggleFilterActive}>Birds</Button>
                <Button variant={filters['amphibians'] ? 'primary' : 'outline-primary'} taxa={'amphibians'} onClick={toggleFilterActive}>Amphibians</Button>
                <Button variant={toggle ? 'primary' : 'outline-primary'}>HELLO</Button>
            </ButtonGroup>
            
        </>
    );
}
