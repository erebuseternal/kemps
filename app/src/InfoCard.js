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
                    <Button>Parent Region</Button>
                    <Button>Sub Regions</Button>
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
                    <th></th>
                    {props.section["headers"].map(
                        header => (
                            <th>{header}</th>
                        )
                    )}
                </thead>
                <tbody>
                    {
                        props.section["rows"].map(
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
}


