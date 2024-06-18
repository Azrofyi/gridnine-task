import React from 'react';
import { calculateDuration, formatDateTime } from '../utils';

const LegDetails = ({ leg }) => {
    const { segments } = leg;
    const departureSegment = segments[0];
    const arrivalSegment = segments[segments.length - 1];
    const { departureCity, departureAirport, departureDate, airline } = departureSegment;
    const { arrivalCity, arrivalAirport, arrivalDate } = arrivalSegment;

    return (
        <div className="leg-details">
            <h2>
                {departureCity.caption}, {departureAirport.caption} ({departureAirport.uid}) →{' '}
                {arrivalCity.caption}, {arrivalAirport.caption} ({arrivalAirport.uid})
            </h2>
            <div className="flight-times">
                <span>{formatDateTime(departureDate)}</span>
                <span>🕒 {calculateDuration(departureDate, arrivalDate)}</span>
                <span>{formatDateTime(arrivalDate)}</span>
            </div>
            <p>Пересадки: {segments.length - 1}</p>
            <p>Рейс выполняет: {airline.caption}</p>
        </div>
    );
};

export default LegDetails;
