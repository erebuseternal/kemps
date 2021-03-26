import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function InfoCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.info["title"]}</Card.Title>
                {
                    props.info["sections"].map(
                        section => (
                            <InfoSection section={section} />
                        )
                    )
                }
                <ButtonGroup toggle>
                    <Button disabled={props.parent_id === -1} onClick={() => props.goUp(props.parent_id)}>Parent Region</Button>
                    <Button disabled={props.child_ids.length === 0} onClick={() => props.goDown(props.child_ids, props.polygon_id)}>Sub Regions</Button>
                    <Button variant="outline-primary" onClick={props.closeInfoWindow}>X</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

const InfoSection = (props) => {
    return (
        <>
            <Card.Subtitle>{props.section["title"]}</Card.Subtitle>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        {props.section["headers"].map(
                            header => (
                                <th>{header}</th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        props.section["rows"].map(
                            row => (
                                <tr>
                                    <td><img src={row["image"]} style={{ height: "50px", width: "auto" }}/></td>
                                    {row["cols"].map(col => <td>{col}</td>)}
                                </tr>
                            )
                        )
                    } 
                </tbody>
            </Table>
        </>
    )
}


