const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { AppFooter } from "./cmps/AppFooter.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { Team } from "./cmps/Team.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { Vision } from "./cmps/Vision.jsx"
import { About } from "./pages/About.jsx"
import { CarDetails } from "./pages/CarDetails.jsx"
import { CarEdit } from "./pages/CarEdit.jsx"
import { CarIndex } from "./pages/CarIndex.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { Home } from "./pages/Home.jsx"
import { More } from "./pages/More.jsx"
import { SurveyIndex } from "./pages/SurveyIndex.jsx"


export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/more" element={<More />} />
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} />
                        </Route>
                        <Route path="/car" element={<CarIndex />} />
                        <Route path="/car/:carId" element={<CarDetails />} />
                        <Route path="/car/edit" element={<CarEdit />} />
                        <Route path="/car/edit/:carId" element={<CarEdit />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/survey" element={<SurveyIndex />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <AppFooter />
                <UserMsg />
            </section>
        </Router>
    )
} 