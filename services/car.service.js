import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CAR_KEY = 'carDB'
_createCars()

export const carService = {
    query,
    get,
    remove,
    save,
    getSpeedStats,
    getVendorStats,
    getEmptyCar,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(CAR_KEY)
        .then(cars => {
            // console.log('cars:', cars)
            if (filterBy.vendor) {
                const regExp = new RegExp(filterBy.vendor, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }
            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.speed >= filterBy.minSpeed)
            }
            return cars
        })
}

function get(carId) {
    return storageService.get(CAR_KEY, carId)
        .then(car => _setNextPrevCarId(car))

}

function remove(carId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(CAR_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { vendor: '', minSpeed: '' }
}

function getFilterFromSearchParams(searchParams) {
    console.log('searchParams:', searchParams)

    // const x = Object.fromEntries(searchParams)
    // console.log('x:', x)

    const vendor = searchParams.get('vendor') || ''
    // console.log('vendor:', vendor)
    const minSpeed = searchParams.get('minSpeed') || ''
    // console.log('minSpeed:', minSpeed)

    return { vendor, minSpeed }
}


function _createCars() {
    let cars = utilService.loadFromStorage(CAR_KEY)
    if (!cars || !cars.length) {
        cars = []
        cars.push(_createCar('audu', 300))
        cars.push(_createCar('fiak', 120))
        cars.push(_createCar('subali', 50))
        cars.push(_createCar('mitsu', 150))
        utilService.saveToStorage(CAR_KEY, cars)
    }
}

function _createCar(vendor, speed = 250) {
    const car = getEmptyCar(vendor, speed)
    car.id = utilService.makeId()
    return car
}

// ststs

function getSpeedStats() {
    return storageService.query(CAR_KEY)
        .then(cars => {
            // console.log('cars:', cars)
            const carCountBySpeedMap = _getCarCountBySpeedMap(cars)
            // console.log('carCountBySpeedMap:', carCountBySpeedMap)
            const data = Object.keys(carCountBySpeedMap)
                .map(speedName =>
                ({
                    title: speedName,
                    value: Math.round((carCountBySpeedMap[speedName] / cars.length) * 100)
                }))
            // console.log('data:', data)
            return data
        })

}

function getVendorStats() {
    return storageService.query(CAR_KEY)
        .then(cars => {
            // console.log('cars:', cars)
            const carCountByVendorMap = _getCarCountByVendorMap(cars)
            // console.log('carCountByVendorMap:', carCountByVendorMap)
            const data = Object.keys(carCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((carCountByVendorMap[vendor] / cars.length) * 100)
                }))
            // console.log('data:', data)
            return data
        })
}

function _getCarCountBySpeedMap(cars) {
    const carCountBySpeedMap = cars.reduce((map, car) => {
        if (car.speed < 120) map.slow++
        else if (car.speed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return carCountBySpeedMap
}

function _getCarCountByVendorMap(cars) {
    const carCountByVendorMap = cars.reduce((map, car) => {
        if (!map[car.vendor]) map[car.vendor] = 0
        map[car.vendor]++
        return map
    }, {})
    return carCountByVendorMap
}

function _setNextPrevCarId(car) {
    return storageService.query(CAR_KEY)
        .then((cars) => {
            const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
            const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
            const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
            car.nextCarId = nextCar.id
            car.prevCarId = prevCar.id
            return car
        })
}