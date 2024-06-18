import LegDetails from './LegDetails';

const FlightCard = ({ flight }) => {
    const { legs, price } = flight.flight;

    return (
        <div className="flight">
            <p className="flight-price">Цена: {price.total.amount} ₽</p>
            <div className="flight-details">
                {legs.map((leg, index) => (
                    <LegDetails key={index} leg={leg} />
                ))}
            </div>
            <button className="select-button">ВЫБРАТЬ</button>
        </div>
    );
};

export default FlightCard;
