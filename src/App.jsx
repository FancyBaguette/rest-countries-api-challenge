import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Home from "./views/Home/Home"
import CountryDetails from "./views/CountryDetails/CountryDetails"

const App = () => {

    const [currentTheme, setCurrentTheme] = useState(
        () => JSON.parse(localStorage.getItem("rest-countries-theme")) || "light"
    )

    return (
        <>
            <Header currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}/>
            <Routes>
                <Route path="/" element={<Home theme={currentTheme}/>}/>
                <Route path="/details/:name" element={<CountryDetails theme={currentTheme}/>}/>
            </Routes>
        </>
    )
}

export default App