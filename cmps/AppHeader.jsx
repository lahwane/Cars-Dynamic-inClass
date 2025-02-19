
const { NavLink, useNavigate } = ReactRouterDOM

export function AppHeader() {

    const navigate = useNavigate()

    function onBack() {
        navigate(-1)
    }

    return (
        <header className="app-header full main-layout">
            <section>
                <h1>React Car App</h1>

                <section>
                    <button onClick={onBack}>Back</button>
                </section>

                <nav className="app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/more">More</NavLink>
                    <NavLink to="/car">Cars</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/survey" >Survey</NavLink>
                </nav>
            </section>
        </header>
    )
}