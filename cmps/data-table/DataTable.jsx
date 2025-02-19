import { DataTableRow } from "./DataTableRow.jsx"

export function DataTable({ cars, onRemoveCar }) {
    return <table className="data-table">
        <thead>
            <tr>
                <th>&nbsp;</th>
                <th>Id</th>
                <th>Vendor</th>
                <th>Speed</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {cars.map(car =>
                <DataTableRow key={car.id} car={car} onRemoveCar={onRemoveCar} />)}
        </tbody>
    </table>
}
