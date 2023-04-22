import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Home from "./views/Home/Home"
import CountryDetails from "./views/CountryDetails/CountryDetails"

const App = () => {

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/details/:name" element={<CountryDetails/>}/>
            </Routes>
        </>
    )
}

export default App