import GoogleApiWrapper from './Map';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
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
                <ButtonGroup toggle>
                    <Button variant={filters['mammals'] ? 'primary' : 'outline-primary'} taxa={'mammals'} onClick={toggleFilterActive}>Mammals</Button>
                    <Button variant={filters['birds'] ? 'primary' : 'outline-primary'} taxa={'birds'} onClick={toggleFilterActive}>Birds</Button>
                    <Button variant={filters['amphibians'] ? 'primary' : 'outline-primary'} taxa={'amphibians'} onClick={toggleFilterActive}>Amphibians</Button>
                </ButtonGroup>
            </div>
            <GoogleApiWrapper polygons={fake_shapes.filter(polygon => activePolygons.includes(polygon["id"]))}  polygonFunc={toggleFunc}/>
            <Navbar fixed="bottom">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{fake_shapes[0]["info"]["title"]}</Card.Title>
                        {
                            fake_shapes[0]["info"]["sections"].map(
                                section => (
                                    <>
                                        <Card.Subtitle>{section["title"]}</Card.Subtitle>
                                        <Table>
                                            <thead>
                                                <th></th>
                                                {section["headers"].map(
                                                    header => (
                                                        <th>{header}</th>
                                                    )
                                                )}
                                            </thead>
                                            <tbody>
                                               {
                                                   section["rows"].map(
                                                       row => (
                                                            <>
                                                                <td><img src={row["image"]} style={{ height: "50px", width: "auto" }}/></td>
                                                                {row["cols"].map(col => <td>{col}</td>)}
                                                            </>
                                                       )
                                                   )
                                               } 
                                            </tbody>
                                        </Table>
                                    </>
                                )
                            )
                        }
                        <ButtonGroup toggle>
                            <Button>Parent Region</Button>
                            <Button>Sub Regions</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </Navbar>
        </>
    );
}
