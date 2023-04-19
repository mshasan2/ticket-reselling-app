import React, {useEffect, useState} from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './SearchEvent.css'

const SearchAndImport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [importedData, setImportedData] = useState([]);
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);


    const handleCreateEventClick = () => {
        if (selectedEvent) {
            console.log(selectedEvent);
            console.log(selectedEvent._embedded.venues[0].city.name);
            console.log(selectedEvent.priceRanges[0].min);
            navigate(`/createEvent?name=${selectedEvent.name}&date=${selectedEvent.dates.start.localDate}&time=${selectedEvent.dates.start.localTime}&place=${selectedEvent._embedded.venues[0].city.name}&price=${selectedEvent.priceRanges[0].min}`);
        }else{
            navigate('/createEvent')
        }
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const fetchDataFromAPI = async (searchQuery) => {
        const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&apikey=vGU0WGd0NUnbDwq5eg8c7G0jFAlK5AHA&size=100`
        );
        const data = await response.json();
        return data._embedded ? data._embedded.events : [];
    };

    const handleImportData = async () => {
        const importedData = await fetchDataFromAPI(searchQuery);
        setImportedData(importedData);
        localStorage.setItem('importedData', JSON.stringify(importedData));
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('importedData'));
        if (storedData) {
            setImportedData(storedData);
        }
    }, []);


    return (
        <div className="d-flex justify-content-center align-items-center h-100 auth-container">
            <Card style={{ width: '70rem', border: '2px solid purple' }}>
                <Card.Header
                    style={{
                        backgroundColor: 'rebeccapurple',
                        borderBottomColor: 'rebeccapurple',
                        color: 'white',
                    }}
                >
                    Import Events
                </Card.Header>
                <Card.Body className="text-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        placeholder="Type something to search..."
                    />
                    <button onClick={handleImportData}>Import</button>
                    <button onClick={handleCreateEventClick}>Create Event</button>
                    <div className="mt-4 d-flex justify-content-center">
                        {importedData.length > 0 ? (
                            <Carousel slide={false}>
                                {importedData.map((item, index) => (
                                    index % 3 === 0 && (
                                        <Carousel.Item key={item.id}>
                                            <div className="d-flex">
                                                {importedData.slice(index, index + 3).map((item) => (
                                                    <Card
                                                        key={item.id}
                                                        style={{ width: "18rem", margin: "0 10px" }}
                                                        onClick={() => setSelectedEvent(item)}
                                                        className={selectedEvent && selectedEvent.id === item.id ? "selected" : ""}>
                                                        <Card.Img variant="top" src={item.images[0].url} />
                                                        <Card.Body>
                                                            <Card.Title>{item.name}</Card.Title>
                                                            <Card.Text>{item.dates.start.localDate}</Card.Text>
                                                            <Card.Text>{item.dates.start.localTime}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                ))}
                                            </div>
                                        </Carousel.Item>
                                    )
                                ))}
                            </Carousel>
                        ) : (
                             <p>No data imported yet</p>
                         )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SearchAndImport;