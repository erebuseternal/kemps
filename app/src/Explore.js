import GoogleApiWrapper from './Map';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import InfoCard from './InfoCard';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import { fake_shapes } from './fake_shapes';



  export default function Explore() {
    const [filters, setFilters] = useState({
        mammals: false,
        birds: false,
        amphibians: false
    });

    const [activePolygons, setActivePolygons] = useState([0]);

    const [selectedPolygon, setSelectedPolygon] = useState(-1);

    const [data, setData] = useState(null);
    const [searchCenter, setSearchCenter] = useState({lat: 37, lng: -122})
    const [searchBounds, setSearchBounds] = useState({
        nelat: 37 + 0.5, nelng: -122 + 0.5,
        swlat: 37 - 0.5, swlng: -122 - 0.5
    })

    const outOfBounds = () => (
        searchBounds["nelat"] <= searchCenter["lat"]
            ||
        searchBounds["nelng"] <= searchCenter["lng"]
            ||
        searchBounds["swlat"] >= searchCenter["lat"]
            ||
        searchBounds["swlng"] >= searchCenter["lng"]
    )

    useEffect(() => {
        const nelat = searchBounds["nelat"];
        const nelng = searchBounds["nelng"];
        const swlat = searchBounds["swlat"];
        const swlng = searchBounds["swlng"];
        const taxa = Object.keys(filters).filter(k => filters[k]).map(k => `taxa=${k.toUpperCase()}`).join('&')
        if (taxa === '') {
            console.log('no filters');
            setData(null);
            setSelectedPolygon(-1);
        } else {
            const query = `https://localhost/loggerhead/v0/regions?${taxa}&nelat=${nelat}&nelng=${nelng}&swlat=${swlat}&swlng=${swlng}`
            console.log(query);
            setData(fake_shapes);
            setSelectedPolygon(-1);
        }
    }, [searchBounds, filters])

    useEffect(() => {
        if (outOfBounds()) {
            setSearchBounds({
                nelat: searchCenter["lat"] + 0.5, nelng: searchCenter["lng"] + 0.5,
                swlat: searchCenter["lat"] - 0.5, swlng: searchCenter["lng"] - 0.5
            })
        }
    }, [searchCenter])

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
                    id => !(data[parent]["child_regions"].includes(id))
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
        setSelectedPolygon(e["polygon_id"]);
    }

    const onDragend = (mapProps, map) => {
        const lat = map["center"]["lat"]();
        const lng = map["center"]["lng"]();
        setSearchCenter({
            lat: lat,
            lng: lng
        });
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
            <GoogleApiWrapper polygons={data ? data.filter(polygon => activePolygons.includes(polygon["id"])) : []}  
                onPolygonClick={onPolygonClick}
                onDragend={onDragend}/>
            <Navbar fixed="bottom">
                {selectedPolygon !== -1 && 
                 <InfoCard 
                    info={data[selectedPolygon]["info"]}
                    polygon_id={selectedPolygon}
                    parent_id={"parent_region" in data[selectedPolygon] ? fake_shapes[selectedPolygon]["parent_region"] : -1}
                    child_ids={"child_regions" in data[selectedPolygon] ? fake_shapes[selectedPolygon]["child_regions"] : []}
                    goUp={goUp}
                    goDown={goDown}
                    closeInfoWindow={closeInfoWindow}
                 />
                }
            </Navbar>
        </>
    );
}
