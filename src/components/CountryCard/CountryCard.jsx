import {useState, useContext} from "react"
import { ThemeContext } from '../../context/ThemeContext'
import {Link} from 'react-router-dom'
import classNames from "classnames"
import './CountryCard.scss'

const CountryBlock = (props) => {

    const {isThemeDark} = useContext(ThemeContext)

    return (
        <Link to={`/details/${props.cca3}`}>
            <div className={classNames('country-card', {'country-card--dark': isThemeDark})}>
                <img src={props.flags.png} alt={`${props.name} flag`} loading="lazy"/>
                <div className="country-card__data">
                    <p className="country-card__title">{props.name}</p>
                    <p><span>Population:</span> {props.population}</p>
                    <p><span>Region:</span> {props.region}</p>
                    <p><span>Population:</span> {props.population}</p>
                </div>
            </div>
        </Link>
    )
}

export default CountryBlock