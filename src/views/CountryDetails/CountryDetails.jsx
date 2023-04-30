import { useEffect, useState, useContext } from "react"
import { ThemeContext } from '../../context/ThemeContext'
import { Link, useParams} from "react-router-dom"
import classNames from "classnames"
import './CountryDetails.scss'

const CountryDetails = (props) => {

    const {name} = useParams()

    const [countryObject, setCountryObject] = useState(null) 
    const [countryBorders, setCountryBorders] = useState(null)
    const [countryNativeNames, setCountryNativeNames] = useState(null)
    const {isThemeDark} = useContext(ThemeContext)

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
            <>
                <Link 
                    className={classNames
                        ('nav-btn', 'go-back-btn', {'nav-btn--dark': isThemeDark}, {'go-back-btn--dark': isThemeDark})
                    } 
                    to='/'
                >
                    Back
                </Link>

                <div className={classNames('country-details', {'country-details--dark': isThemeDark})}>
                    <div className="country-details__flag-wrapper">
                        <img className="country-details__flag" src={countryObject.flags.svg} alt={`${countryObject.name.common} flag`} />
                    </div>
                    <div className="country-details__data-wrapper">
                        <h1 className="data-wrapper__country-title">{countryObject.name.common}</h1>
                        <div className="data-wrapper__trivia-wrapper">
                            <div className="trivia-wrapper__trivia-block">
                                <p><span>Native Names:</span> {countryNativeNames && formatNativeNames(countryNativeNames)}</p>
                                <p><span>Population:</span> {countryObject.population}</p>
                                <p><span>Region:</span> {countryObject.region}</p>
                                <p><span>Sub Region:</span> {countryObject.subregion}</p>
                                <p><span>Capital:</span> {countryObject.capital}</p>
                            </div>
                            <div className="trivia-wrapper__trivia-block">
                                <p><span>Top Level Domain:</span> {countryObject.tld}</p>
                                <p><span>Currencies:</span> {getCurrencies(countryObject.currencies)}</p>
                                <p><span>Languages:</span> {getLanguages(countryObject.languages)}</p>
                            </div>
                        </div>
                        { countryBorders &&
                            <div className="data-wrapper__borders-wrapper">
                                <h2>Border Countries:</h2>
                                <div className="borders-wrapper__border-links">
                                    {
                                        countryBorders.map(border => {
                                            return (
                                                    <Link 
                                                        className={classNames('nav-btn', 'border-btn', {'nav-btn--dark': isThemeDark})} 
                                                        key={border.code}
                                                        to={`/details/${border.code}`}
                                                    >
                                                        {border.name}
                                                    </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    )
}

export default CountryDetails