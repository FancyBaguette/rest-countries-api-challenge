import { useState } from "react"
import CountryList from "../../components/CountryList/CountryList"
import FilterSelector from "../../components/FilterSelector/FilterSelector"
import SearchBar from "../../components/SearchBar/SearchBar"
import './Home.scss'

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [regionFilter, setRegionFilter] = useState("")

    return (
        <>
            <div className="search-filters-wrapper">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <FilterSelector regionFilter={regionFilter} setRegionFilter={setRegionFilter}/>
            </div>
            <CountryList searchQuery={searchQuery} regionFilter={regionFilter}/>
        </>
    )
}

export default Home