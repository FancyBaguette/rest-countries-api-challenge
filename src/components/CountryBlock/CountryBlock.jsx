import {Link} from 'react-router-dom'

const CountryBlock = (props) => {
    return (
        <Link to={`/details/${props.cca3}`}>
            <article>
                <img src={props.flags.png} alt={`${props.name} flag`} loading="lazy"/>
                <p className="country-block-title">{props.name}</p>
                <p className="country-block-data"><span>Population:</span> {props.population}</p>
                <p className="country-block-data"><span>Region:</span> {props.region}</p>
                <p className="country-block-data"><span>Population:</span> {props.population}</p>
            </article>
        </Link>
    )
}

export default CountryBlock