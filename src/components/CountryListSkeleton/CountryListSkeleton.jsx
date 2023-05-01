import {useContext} from "react"
import { ThemeContext } from '../../context/ThemeContext'
import { nanoid } from "nanoid"
import classNames from "classnames"
import "./CountryListSkeleton.scss"

const CountryListSkeleton = (props) => {

    const {isThemeDark} = useContext(ThemeContext)

    const skeletonBlocks = Array.from({length: props.amount}, () => {
        return (
            <div className={classNames('country-list__skeleton-card', {'country-list__skeleton-card--dark': isThemeDark})} key={nanoid()}>
                <div 
                    className={classNames("skeleton-card__box", "skeleton-card__box--flag", {'skeleton-card__box--dark': isThemeDark})}
                />
                <div className="skeleton-card__card-data">
                    <div 
                        className={classNames("skeleton-card__box", "skeleton-card__box--title", {'skeleton-card__box--dark': isThemeDark})}
                    />
                    <div 
                        className={classNames("skeleton-card__box", "skeleton-card__box--paragraph", {'skeleton-card__box--dark': isThemeDark})}
                    />
                    <div 
                        className={classNames("skeleton-card__box", "skeleton-card__box--paragraph", {'skeleton-card__box--dark': isThemeDark})}
                    />
                    <div 
                        className={classNames("skeleton-card__box", "skeleton-card__box--paragraph", {'skeleton-card__box--dark': isThemeDark})}
                    />
                </div>
            </div>
        )
    })

    return skeletonBlocks
}

export default CountryListSkeleton