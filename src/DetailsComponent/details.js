import React, {useState} from 'react';
import {Button, ButtonGroup, Col, Container, Image, Row} from 'react-bootstrap';
import {faCalendarAlt, faClock, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router";
import Reviews from "../ReviewsComponent";
import {useSelector} from "react-redux";

function DetailInformation({details}) {
    const [count, setCount] = useState(0);
    const [buttonText, setButtonText] = useState('Follow');

    const followBtn = () => {
        if (buttonText === 'Follow') {
            setButtonText('Following');
        } else {
            setButtonText('Follow');
        }
    }

    const handlePlusClick = () => {
        setCount(count + 1);
    };

    const handleMinusClick = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const navigate = useNavigate();

    const handleBuyTicket = () => {
        window.alert('Tickets Bought!');
        navigate('/');
    }

    return (
        <Container style={{margin: 10, padding: 10}}>
            <Row className="justify-content-center text-center">
                <Col md={6} lg={5}>
                    <Image className="rounded-4"
                           style={{maxWidth: '100%', height: 'auto'}}
                           src={`/images/${details.detailsPicture}`} alt="Picture"/>
                    <h1 className="text-center"
                        style={{fontWeight: 'bold', paddingTop: 30}}>{details.eventTitle}</h1>
                    <p className="text-center"
                       style={{
                           color: 'gray',
                           fontWeight: "bold",
                           fontSize: '20px'
                       }}>{details.datePosted}</p>
                    <p className="text-center" style={{color: 'gray'}}>{details.eventDesc}</p>
                    <div
                        className="d-flex justify-content-between align-items-center flex-wrap">
                        <h5 className="my-3">By {details.postedBy}</h5>
                        <Button className="btn btn-light btn-outline-info my-3"
                                onClick={followBtn}>{buttonText}</Button>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <div className="my-3">
                                <h5>
                                    <FontAwesomeIcon className="fa-solid" icon={faCalendarAlt}
                                                     style={{paddingRight: 7}}/> Date and Time
                                </h5>
                                <p>{details.eventDate}</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="my-3">
                                <h5>
                                    <FontAwesomeIcon className="fa-solid" icon={faMapMarkerAlt}
                                                     style={{paddingRight: 7}}/> Location
                                </h5>
                                <p>{details.address}</p>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <h4 className="text-center">About This Event</h4>
                        <div
                            className="d-flex justify-content-between align-items-center flex-wrap">
                            <div className="my-3">
                                <p><FontAwesomeIcon className="fa-solid" icon={faClock}
                                                    style={{paddingRight: 7}}/>{details.durationOfTheEvent} hrs
                                </p>
                                <p>{details.details}</p>
                            </div>
                        </div>

                        <Button block className="btn btn-primary btn-lg"
                                onClick={handleBuyTicket}>Buy Ticket</Button>
                        <ButtonGroup className="ps-2">
                            <Button variant="secondary"
                                    onClick={handleMinusClick}>-</Button>
                            <Button variant="light">{count}</Button>
                            <Button variant="success" onClick={handlePlusClick}>+</Button>
                        </ButtonGroup>
                    </div>
                    <div className={"mt-3"}>
                        <Reviews/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailInformation;
