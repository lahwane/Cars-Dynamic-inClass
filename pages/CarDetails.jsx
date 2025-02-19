const { useParams, Link, useNavigate } = ReactRouterDOM

import { carService } from "../services/car.service.js"

const { useEffect, useState } = React

export function CarDetails() {

    const [car, setCar] = useState(null)
    const { carId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCar()
    }, [carId])

    function loadCar() {
        carService.get(carId)
            .then(car => setCar(car))
            .catch(() => {
                navigate(`/car`)
            })
    }

    if (!car) return <div>Loading...</div>
    return (
        <section className="car-details">
            <button ><Link to="/car">Back</Link></button>
            <h1>Car Vendor: {car.vendor}</h1>
            <img src={`../assets/img/${car.vendor}.png`}
                onError={({ currentTarget }) => currentTarget.src = "../assets/img/default.png"}
            />
            <h2>Car Speed: {car.speed}</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>

            <nav className="car-nav">
                <Link to={`/car/${car.prevCarId}`}>
                    <button><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <Link to={`/car/${car.nextCarId}`}>
                    <button><i className="fa-solid fa-arrow-right"></i></button>
                </Link>
            </nav>
        </section>
    )
}