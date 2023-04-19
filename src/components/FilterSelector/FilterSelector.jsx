import {useState} from "react"
import "./FilterSelector.scss"

const FilterSelector = (props) => {

    const [isExpanded, setIsExpanded] = useState(false)

    // return (
    //     <select name="regions" id="regions-select" onChange={(e) => props.setRegionFilter(e.target.value)}>
    //         <option value="">Filter by Region</option>
    //         <option value="africa">Africa</option>
    //         <option value="americas">America</option>
    //         <option value="asia">Asia</option>
    //         <option value="europe">Europe</option>
    //         <option value="oceania">Oceania</option>
    //     </select>
    // )
    console.log(props.regionFilter, props.regionFilter === '')
    return (
        <div className="filter-selector-wrapper" onClick={() => setIsExpanded(prevState => !prevState)}>
            Filter by Region {props.regionFilter === '' ? '' : `(${props.regionFilter})`}
            {
                isExpanded &&
                <div className="filter-selector-dropdown">
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