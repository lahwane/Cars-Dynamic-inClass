const { useEffect, useState } = React
import { Chart } from '../cmps/Chart.jsx'
import { carService } from '../services/car.service.js'

export function Dashboard() {

    const [cars, setCars] = useState([])
    const [speedStats, setSpeedStats] = useState([])
    const [vendorStats, setVendorStats] = useState([])

    useEffect(() => {
        carService.query()
            .then(setCars)
        carService.getSpeedStats()
            .then(setSpeedStats)
        carService.getVendorStats()
            .then(setVendorStats)
    }, [])


    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {cars.length} Cars</h2>
            <h4>By Vendor</h4>
            <Chart data={vendorStats} />
            <hr />
            <h4>By Speed</h4>
            <Chart data={speedStats} />
        </section>
    )
}