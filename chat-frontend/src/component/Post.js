import React from 'react';
import {Card, CardBody, CardText, Col, Row} from "reactstrap";

const Post = props => {
    return (
        <Row>
            <Col xs={10} style={{margin: '10px 0'}}>
                <Card body outline color="primary">
                    <CardBody>
                        <Row>
                        <Col xs={6} style={{
                            fontWeight: 'bold',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '10px',

                        }}>
                            <CardText>{props.datetime}</CardText>
                        </Col>
                        <Col xs={3} style={{fontWeight: 'bold'}}>
                            <CardText>{props.author}:</CardText>
                        </Col>
                        <Col xs={3}>
                            <CardText>{props.message}</CardText>
                        </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>


    );
};

export default Post;