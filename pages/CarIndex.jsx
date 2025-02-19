const { Link } = ReactRouterDOM
import { CarFilter } from "../cmps/CarFilter.jsx";
import { CarList } from "../cmps/CarList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import { carService } from "../services/car.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM


export function CarIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    // console.log('searchParams:', searchParams)

    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadCars()
    }, [filterBy])


    function loadCars() {
        carService.query(filterBy)
            .then(cars => {
                setCars(cars)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars(cars =>
                    cars.filter(car => car.id !== carId)
                )
                showSuccessMsg(`Car (${carId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing car:', err)
                showErrorMsg(`Having problems removing car!`)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!cars) return <div>Loading...</div>
    return (
        <section className="car-index">
            <button><Link to="/car/edit">Add Car</Link></button>
            <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <CarList cars={cars} onRemoveCar={onRemoveCar} />

            {/* <DataTable cars={cars} onRemoveCar={onRemoveCar} /> */}
        </section>
    )


}