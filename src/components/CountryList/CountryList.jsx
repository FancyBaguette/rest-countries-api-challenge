import { useEffect, useState } from "react"
import CountryBlock from "../CountryBlock/CountryBlock"
import './CountryList.scss'

const CountryList = (props) => {

    const [countriesArray, setCountriesArray] = useState(null)
    const [filteredCountriesArray, setFilteredCountriesArray] = useState(null)

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,region,population,flags,cca3')
            .then(response => response.json())
                .then(data => setCountriesArray(data))
    },[])

    useEffect(() => {

        if (countriesArray) {
            const filteredArray = countriesArray.filter(country => {
                if (props.searchQuery && props.regionFilter) {
                    return (
                        country.name.common.includes(props.searchQuery) ||
                        country.name.common.toLowerCase().includes(props.searchQuery) &&
                        country.region.toLowerCase() === props.regionFilter
                    )
                } else if (props.searchQuery) {
                    return (
                        country.name.common.includes(props.searchQuery) ||
                        country.name.common.toLowerCase().includes(props.searchQuery)
                    )
                } else if (props.regionFilter) {
                    return country.region.toLowerCase() === props.regionFilter
                } else {
                    return true 
                    // Returns the original array without any changes
                }
                
            })

            setFilteredCountriesArray(filteredArray)
        }
        
    },[countriesArray, props.searchQuery, props.regionFilter])

    return (
        <div className="country-list">
            {

                !filteredCountriesArray ? <p>Loading...</p> :
                filteredCountriesArray.length > 0 ?
                    filteredCountriesArray.map(country => {
                        return <CountryBlock
                            key={country.cca3} 
                            cca3={country.cca3}
                            name={country.name.common} 
                            region={country.region}
                            population={country.population} 
                            flags={country.flags}
                        />
                    })
                : <p>No countries matching your criteria</p>

            }
        </div>
    )
}

export default CountryList