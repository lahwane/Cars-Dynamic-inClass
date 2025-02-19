import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function CarFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter,500))

    useEffect(() => {
        onSetFilterDebounced.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {

        let { value, name: field, type } = target
        if (type === 'number') value = +value
        // if(type === 'checkbox') value = target.checked

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { vendor, minSpeed } = filterByToEdit

    return (
        <section className="car-filter">
            <h2>Filter Our Cars</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="vendor">Vendor</label>
                <input value={vendor} onChange={handleChange} name="vendor" type="text" id="vendor" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input value={minSpeed || ''} onChange={handleChange} name="minSpeed" type="number" id="minSpeed" />

                <button>Submit</button>
            </form>
        </section>
    )
}