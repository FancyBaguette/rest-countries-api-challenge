import { Routes, Route } from "react-router-dom"
import { ThemeContext } from "./context/ThemeContext"
import { useState } from "react"
import Header from "./components/Header/Header"
import Home from "./views/Home/Home"
import CountryDetails from "./views/CountryDetails/CountryDetails"
import classNames from "classnames"
import "./App.scss"

const App = () => {

    const [isThemeDark, setIsThemeDark] = useState(
        () => JSON.parse(localStorage.getItem('rest-countries-dark-theme')) || false
    )

    return (
        <div className={classNames('app-container', {'app-container--dark': isThemeDark})}>
            <ThemeContext.Provider value={{isThemeDark, setIsThemeDark}}>
                <Header/>
                <main className="main-content-wrapper">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/details/:name" element={<CountryDetails/>}/>
                    </Routes>
                </main>
            </ThemeContext.Provider>
        </div>
    )
}

export default App