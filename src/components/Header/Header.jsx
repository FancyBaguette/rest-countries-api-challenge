import { ThemeContext } from '../../context/ThemeContext'
import FilledMoon from '../../assets/icons/moon-filled.svg'
import HollowMoon from '../../assets/icons/moon-hollow.svg'
import classNames from 'classnames'
import { useContext } from 'react'
import './Header.scss'

const Header = () => {

    const {isThemeDark, setIsThemeDark} = useContext(ThemeContext)

    return (
        <header className={classNames('header', {'header--dark': isThemeDark})}>

            <p className="header__title">Where in the world?</p>

            <button 
                className='header__theme-toggle-btn'
                onClick={() => {
                    setIsThemeDark(prevState => !prevState)
                    localStorage.setItem('rest-countries-dark-theme', !JSON.parse(localStorage.getItem('rest-countries-dark-theme')))
                }}
            >
                <img className='theme-icon' src={`${isThemeDark ? FilledMoon : HollowMoon}`}/>
                Dark mode
            </button>

        </header>
    )
}

export default Header