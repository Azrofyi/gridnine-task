export const formatDateTime = (dateTime) => {
    const options = {
        day: 'numeric',
        month: 'short',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(dateTime).toLocaleDateString('ru-RU', options).replace(',', '');
};

export const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate - startDate;
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.floor((diffMs % 3600000) / 60000);
    return `${diffHrs} ч ${diffMins} мин`;
};

export const extractAirlines = (flights) => {
    const airlines = {};
    flights.forEach((flight) => {
        flight.flight.legs.forEach((leg) => {
            leg.segments.forEach((segment) => {
                const airline = segment.airline.caption;
                const price = +flight.flight.price.total.amount;

                if (!airlines[airline] || airlines[airline] > price) {
                    airlines[airline] = { price, active: false };
                }
            });
        });
    });
    return airlines;
};

export const filterFlights = (flights, filters) => {
    let filteredFlights = [...flights];

    if (filters?.oneTransfer) {
        filteredFlights = filteredFlights.filter((flight) =>
            flight.flight.legs.some((leg) => leg.segments.length - 1 === 1),
        );
    }

    if (filters?.nonStop) {
        filteredFlights = filteredFlights.filter((flight) =>
            flight.flight.legs.some((leg) => leg.segments.length - 1 === 0),
        );
    }

    const selectedAirlines = Object.keys(filters.airlines).filter(
        (airline) => filters.airlines[airline].active,
    );

    if (selectedAirlines.length > 0) {
        filteredFlights = filteredFlights.filter((flight) =>
            flight.flight.legs.some((leg) =>
                leg.segments.some((segment) => selectedAirlines.includes(segment.airline.caption)),
            ),
        );
    }

    filteredFlights = filteredFlights.filter(
        (flight) =>
            +flight.flight.price.total.amount >= +filters.minPrice &&
            +flight.flight.price.total.amount <= +filters.maxPrice,
    );

    switch (filters.sort) {
        case 'ascPrice':
            filteredFlights.sort(
                (a, b) => a.flight.price.total.amount - b.flight.price.total.amount,
            );
            break;
        case 'descPrice':
            filteredFlights.sort(
                (a, b) => b.flight.price.total.amount - a.flight.price.total.amount,
            );
            break;
        case 'duration':
            filteredFlights.sort((a, b) => {
                const aDuration =
                    new Date(a.flight.legs[0].segments.slice(-1)[0].arrivalDate) -
                    new Date(a.flight.legs[0].segments[0].departureDate);
                const bDuration =
                    new Date(b.flight.legs[0].segments.slice(-1)[0].arrivalDate) -
                    new Date(b.flight.legs[0].segments[0].departureDate);
                return aDuration - bDuration;
            });
            break;
        default:
            break;
    }

    return filteredFlights;
};
