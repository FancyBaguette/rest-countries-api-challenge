import {useState, useContext} from "react"
import { ThemeContext } from '../../context/ThemeContext'
import classNames from "classnames"
import ChevronBlack from "../../assets/icons/chevron-black.svg"
import ChevronWhite from "../../assets/icons/chevron-white.svg"
import "./FilterSelector.scss"

const FilterSelector = (props) => {

    const [isExpanded, setIsExpanded] = useState(false)
    const {isThemeDark} = useContext(ThemeContext)

    return (
        <div 
            className={classNames('filter-selector-wrapper', {'filter-selector-wrapper--dark': isThemeDark})} 
            onClick={() => setIsExpanded(prevState => !prevState)}
        >
            Filter by Region
            <img src={`${isThemeDark ? ChevronWhite : ChevronBlack}`} aria-hidden className="filter-selector-wrapper__icon" />
            {
                isExpanded &&
                <div className={classNames('filter-selector-dropdown', {'filter-selector-dropdown--dark': isThemeDark})} >
                    <button onClick={() => props.setRegionFilter(prevState => "")}>All</button>
                    <button onClick={() => props.setRegionFilter(prevState => "africa")}>Africa</button>
                    <button onClick={() => props.setRegionFilter(prevState => "americas")}>America</button>
                    <button onClick={() => props.setRegionFilter(prevState => "asia")}>Asia</button>
                    <button onClick={() => props.setRegionFilter(prevState => "europe")}>Europe</button>
                    <button onClick={() => props.setRegionFilter(prevState => "oceania")}>Oceania</button>
                </div>
            }
        </div>
    )
}

export default FilterSelector