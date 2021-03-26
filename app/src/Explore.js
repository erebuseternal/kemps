import GoogleApiWrapper from './Map';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfoCard from './InfoCard';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { fake_shapes } from './fake_shapes';



  export default function Explore() {
    const [filters, setFilters] = useState({
        mammals: true,
        birds: false,
        amphibians: false
    });

    const [activePolygons, setActivePolygons] = useState([0]);

    const [selectedPolygon, setSelectedPolygon] = useState(-1);

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

    const onPolygonClick = (e) => {
        setSelectedPolygon(e["polygon_id"])
    }

    return (
        <>  
            <div>
                <ButtonGroup toggle>
                    <Button variant={filters['mammals'] ? 'primary' : 'outline-primary'} taxa={'mammals'} onClick={toggleFilterActive}>Mammals</Button>
                    <Button variant={filters['birds'] ? 'primary' : 'outline-primary'} taxa={'birds'} onClick={toggleFilterActive}>Birds</Button>
                    <Button variant={filters['amphibians'] ? 'primary' : 'outline-primary'} taxa={'amphibians'} onClick={toggleFilterActive}>Amphibians</Button>
                </ButtonGroup>
            </div>
            <GoogleApiWrapper polygons={fake_shapes.filter(polygon => activePolygons.includes(polygon["id"]))}  onPolygonClick={onPolygonClick}/>
            <Navbar fixed="bottom">
                {selectedPolygon !== -1 && <InfoCard info={fake_shapes[selectedPolygon]["info"]} />}
            </Navbar>
        </>
    );
}
