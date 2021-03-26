import GoogleApiWrapper from './Map';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
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

    const goUp = (parent) => {
        setActivePolygons(
            (prev) => {
                return prev.filter(
                    id => !(fake_shapes[parent]["child_regions"].includes(id))
                ).concat([parent])
            }
        );
        setSelectedPolygon(-1);
    }

    const goDown = (child_ids, polygon_id) => {
        setActivePolygons(
            (prev) => (
                prev.filter(
                    id => id !== polygon_id
                ).concat(child_ids)
            )
        );
        setSelectedPolygon(-1);
    }

    const onPolygonClick = (e) => {
        setSelectedPolygon(e["polygon_id"])
    }

    const closeInfoWindow = () => {
        setSelectedPolygon(-1);
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
                {selectedPolygon !== -1 && 
                 <InfoCard 
                    info={fake_shapes[selectedPolygon]["info"]}
                    polygon_id={selectedPolygon}
                    parent_id={"parent_region" in fake_shapes[selectedPolygon] ? fake_shapes[selectedPolygon]["parent_region"] : -1}
                    child_ids={"child_regions" in fake_shapes[selectedPolygon] ? fake_shapes[selectedPolygon]["child_regions"] : []}
                    goUp={goUp}
                    goDown={goDown}
                    closeInfoWindow={closeInfoWindow}
                 />
                }
            </Navbar>
        </>
    );
}
