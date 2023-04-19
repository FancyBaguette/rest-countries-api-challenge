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
        const currencyCodes = []
        for (const currency in obj) {
            currencyCodes.push(currency)
        }
        return currencyCodes.map(code => {
            return countryObject.currencies[code].name
        })
    }

    const getLanguages = (obj) => {
        const languageCodes = []
        for (const language in obj) {
            languageCodes.push(language)
        }
        return languageCodes.map((code, index) => {
            return index === languageCodes.length - 1 ? `${countryObject.languages[code]}` : `${countryObject.languages[code]}, `
        })
    }

    const formatNativeNames = (array) => {
        return array.map((foo, index) => {
            return index === array.length - 1 ? `${array[index]}` : `${array[index]}, `
        })
    }

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