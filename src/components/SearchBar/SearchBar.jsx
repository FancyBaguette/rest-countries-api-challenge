import { useState } from "react"

const SearchBar = (props) => {

    return (
        <input 
            type="text" 
            placeholder="Search for a country..."
            value={props.searchQuery}
            onChange={(e) => props.setSearchQuery(e.target.value)}
        />
    )

}

export default SearchBar