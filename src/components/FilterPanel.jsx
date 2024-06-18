const FilterPanel = ({ filters, setFilters }) => {
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (name.startsWith('airline_')) {
            const airlineName = name.split('airline_')[1];
            setFilters((prevFilters) => ({
                ...prevFilters,
                airlines: {
                    ...prevFilters.airlines,
                    [airlineName]: { ...prevFilters.airlines[airlineName], active: checked },
                },
            }));
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    return (
        <div className="filter-panel">
            <h3>Сортировать</h3>
            <label>
                <input
                    type="radio"
                    name="sort"
                    value="ascPrice"
                    checked={filters.sort === 'ascPrice'}
                    onChange={handleChange}
                />
                - по возрастанию цены
            </label>
            <label>
                <input
                    type="radio"
                    name="sort"
                    value="descPrice"
                    checked={filters.sort === 'descPrice'}
                    onChange={handleChange}
                />
                - по убыванию цены
            </label>
            <label>
                <input
                    type="radio"
                    name="sort"
                    value="duration"
                    checked={filters.sort === 'duration'}
                    onChange={handleChange}
                />
                - по времени в пути
            </label>
            <h3>Фильтровать</h3>
            <label>
                <input
                    type="checkbox"
                    name="oneTransfer"
                    checked={filters.oneTransfer}
                    onChange={handleChange}
                />
                - 1 пересадка
            </label>
            <label>
                <input
                    type="checkbox"
                    name="nonStop"
                    checked={filters.nonStop}
                    onChange={handleChange}
                />
                - без пересадок
            </label>
            <h3>Цена</h3>
            <label>
                От
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleChange}
                />
            </label>
            <label>
                До
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleChange}
                />
            </label>
            <h3>Авиакомпании</h3>
            {Object.keys(filters.airlines).map((airline) => (
                <label key={airline}>
                    <input
                        type="checkbox"
                        name={`airline_${airline}`}
                        checked={filters.airlines[airline].active}
                        onChange={handleChange}
                    />
                    - {airline} от {filters.airlines[airline].price} р.
                </label>
            ))}
        </div>
    );
};

export default FilterPanel;
