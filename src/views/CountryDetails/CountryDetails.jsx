import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";

const CountryDetails = (props) => {

    const {name} = useParams()

    const [countryObject, setCountryObject] = useState(null) 
    const [countryBorders, setCountryBorders] = useState(null)
    const [countryNativeNames, setCountryNativeNames] = useState(null)

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha?codes=${name}`)
        .then(response => response.json())
                .then(data => setCountryObject(prevState => data[0]))
    },[name])

    useEffect(() => {
        if (countryObject && countryObject.borders) {
            const queryString = countryObject.borders.join(',')
            fetch(`https://restcountries.com/v3.1/alpha?codes=${queryString}`)
                .then(response => response.json())
                    .then(data => {
                        const bordersArray = data.map(country => {
                            return {
                                name: country.name.common,
                                code: country.cioc
                            }
                        })
                        setCountryBorders(prevState => bordersArray)
                    })
        }

        if (countryObject && countryObject.name.nativeName) {
            const nativeNames = []
            Object.keys(countryObject.name.nativeName).forEach(key => {
                nativeNames.push(countryObject.name.nativeName[key].common)
            })
            setCountryNativeNames(prevState => nativeNames)
        }
    },[countryObject])

    const getCurrencies = (obj) => {
        return Object.keys(obj).map(code => {
            return countryObject.currencies[code].name
        }).join(', ')
    }

    const getLanguages = (obj) => {
        return Object.keys(obj).map(code => {
            return countryObject.languages[code]
        }).join(', ')
    }

    const formatNativeNames = (array) => array.join(', ')

    return (
        countryObject && (
            <main>
                <Link to='/'>
                    <p>Back</p>
                </Link>

                <img src={countryObject.flags.png} alt={`${countryObject.name.common} flag`} />

                <h1>{countryObject.name.common}</h1>

                <div className="data-block">
                    <p><span>Native Names:</span> {countryNativeNames && formatNativeNames(countryNativeNames)}</p>
                    <p><span>Population:</span> {countryObject.population}</p>
                    <p><span>Region:</span> {countryObject.region}</p>
                    <p><span>Sub Region:</span> {countryObject.subregion}</p>
                    <p><span>Capital:</span> {countryObject.capital}</p>
                </div>

                <div className="data-block">
                    <p><span>Top Level Domain:</span> {countryObject.tld}</p>
                    <p><span>Currencies:</span> {getCurrencies(countryObject.currencies)}</p>
                    <p><span>Languages:</span> {getLanguages(countryObject.languages)}</p>
                </div>

                
                { countryBorders &&
                    countryBorders.map(border => {
                        return (
                            <div className="borders-data">
                                <Link to={`/details/${border.code}`}>
                                    <p>{border.name}</p>
                                </Link>
                            </div>
                        )
                    })
                }
            </main>
        )
    )
}

export default CountryDetails