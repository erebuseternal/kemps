import GoogleApiWrapper from './Map';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { fake_shapes } from './fake_shapes';



  export default function Explore() {
    const [filters, setFilters] = useState({
        mammals: true,
        birds: false,
        amphibians: false
    });

    const [activePolygons, setActivePolygons] = useState([0]);

    const toggleFilterActive = ({target}) => {
        const taxa = target.getAttribute('taxa');
      setFilters((prevFilters) => (
        {
          ...prevFilters,
          [taxa]: !prevFilters[taxa]
      }));
    };

    const toggleFunc = (e) => {
        const polygon_id = e["polygon_id"];
        const polygon_children = e["polygon_children"];
        setActivePolygons(
            (prev) => (
                prev.filter(
                    id => id !== polygon_id
                ).concat(polygon_children)
            )
        );
    }

    return (
        <>
            <div>
            <GoogleApiWrapper polygons={fake_shapes.filter(polygon => activePolygons.includes(polygon["id"]))}  polygonFunc={toggleFunc}/>
            {console.log(fake_shapes.filter(polygon => activePolygons.includes(polygon["id"])))}
            </div>
            <ButtonGroup toggle>
                <Button variant={filters['mammals'] ? 'primary' : 'outline-primary'} taxa={'mammals'} onClick={toggleFilterActive}>Mammals</Button>
                <Button variant={filters['birds'] ? 'primary' : 'outline-primary'} taxa={'birds'} onClick={toggleFilterActive}>Birds</Button>
                <Button variant={filters['amphibians'] ? 'primary' : 'outline-primary'} taxa={'amphibians'} onClick={toggleFilterActive}>Amphibians</Button>
            </ButtonGroup>
            
        </>
    );
}
