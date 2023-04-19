import { useState } from "react"
import CountryList from "../../components/CountryList/CountryList"
import FilterSelector from "../../components/FilterSelector/FilterSelector"
import SearchBar from "../../components/SearchBar/SearchBar"

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [regionFilter, setRegionFilter] = useState("")

    return (
        <>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <FilterSelector regionFilter={regionFilter} setRegionFilter={setRegionFilter}/>
            <CountryList searchQuery={searchQuery} regionFilter={regionFilter}/>
        </>
    )
}

export default Home