const { useState, Fragment } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ car, onRemoveCar }) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Fragment>
            <tr>
                <td className="toggle-expand" onClick={() => {
                    setIsExpanded(prevIsExpanded => !prevIsExpanded)
                }}>
                    {(isExpanded) ? '-' : '+'}
                </td>
                <td>{car.id}</td>
                <td>{car.vendor}</td>
                <td>{car.speed}</td>
                <td>
                    <Link to={`/car/${car.id}`}>Details</Link> |
                    <Link to={`/car/edit/${car.id}`}>Edit</Link>
                </td>
            </tr>
            <tr hidden={!isExpanded}>
                <td colSpan="5" className="car-info">
                    <h5>{car.vendor}</h5>
                    <img
                        src={`../assets/img/${car.vendor}.png`}
                        onError={({ currentTarget }) => currentTarget.src = "../assets/img/default.png"}
                    />
                    <p>{car.vendor}s are best for lorem ipsum dolor</p>
                    <button onClick={() => onRemoveCar(car.id)}>Remove Car</button>
                </td>
            </tr>
        </Fragment>
    )
}
