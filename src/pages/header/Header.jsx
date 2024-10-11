import './Header.scss';
import { logo, white_logo } from '../../Images/logo';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Header_menu = () => {

    const [menu, setmenu] = useState('')

    const Header_data = [
        {
            label: 'Home',
            svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path fill="#ffffff" d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>,
            link: '/login_page'
        },
        {
            label: 'User',
            svg: <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '25px' }} viewBox="0 0 448 512">
                <path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>,
            link: '/login_page'
        },
    ]

    const Show_menu = (e, type) => {
        let switcher = e.target.closest('.ds-navigaion-menu');
        if (!menu) {
            setmenu('datasphere');
            switcher.style.width = '160px'
        } else {
            setmenu('');
            switcher.style.width = '45px'

        }
    }

    return (
        <div className='ds-navigation-container'>
            <div className='ds-navigaion-menu'>
                <div className='ds-navigation-logo' onClick={(e) => { Show_menu(e) }}>
                    <span className={`${'datasphere' === menu ? 'ds-nav-logo active' : 'ds-nav-logo '}`}>
                        {white_logo}
                    </span>
                    {
                        menu && Header_data?.map((data) => {
                            return (
                                <Link className='ds-nav-toggle-hidden' to={data.link}>
                                    <span className={data.label === menu ? 'active' : ''} onClick={() => {setmenu(data.label)}}>
                                        {data.svg}
                                    </span>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Header_menu;