import { ThemeContext } from '../../context/ThemeContext'
import { useContext } from "react"
import classNames from "classnames"
import './SearchBar.scss'

const SearchBar = (props) => {

    const {isThemeDark} = useContext(ThemeContext)

    return (
        <input 
            className={classNames('search-bar', {'search-bar--dark': isThemeDark})}
            type="text" 
            placeholder="Search for a country..."
            value={props.searchQuery}
            onChange={(e) => props.setSearchQuery(e.target.value)}
        />
    )

}

export default SearchBar