import { useEffect, useState } from 'react';
import axios from 'axios';
import FlightCard from './FlightCard';
import FilterPanel from './FilterPanel';
import './FlightSearch.css';
import { extractAirlines, filterFlights } from '../utils.js';

const FlightSearch = () => {
    const [allFlights, setAllFlights] = useState([]);
    const [flights, setFlights] = useState([]);
    const [filters, setFilters] = useState({
        sort: 'ascPrice',
        oneTransfer: false,
        nonStop: false,
        minPrice: 0,
        maxPrice: 1000000,
        airlines: {},
    });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get('/gridnine-task/flights.json')
            .then((response) => {
                const flights = response.data.result.flights;
                setAllFlights(flights);
                setFlights(flights.slice(0, 2));
                const airlines = extractAirlines(flights);
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    airlines,
                }));
            })
            .catch((error) => console.error('Error', error));
    }, []);

    const loadMoreFlights = () => {
        setLoading(true);

        setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        const filtered = filterFlights(allFlights, filters);
        setFlights(filtered.slice(0, page * 5));
    }, [page, filters, allFlights]);

    return (
        <div className="flight-search">
            <h1>Поиск авиабилетов</h1>
            <div className="search-container">
                <FilterPanel filters={filters} setFilters={setFilters} />
                <div className="flight-list">
                    {filterFlights(flights, filters).map((flight, index) => (
                        <FlightCard key={index} flight={flight} />
                    ))}
                    {loading && <p>Загрузка...</p>}
                    {page * 5 < allFlights.length && !loading && (
                        <button className="load-more-button" onClick={loadMoreFlights}>
                            Показать еще
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FlightSearch;
