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
            svg: <svg width="38" height="40" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.03297 20.7823C6.35288 17.7697 8.90193 15.423 11.9992 15.423C15.0966 15.423 17.6456 17.7699 17.9654 20.7824M22 12.7568C22 18.2796 17.5228 22.7568 12 22.7568C6.47705 22.7568 2 18.2796 2 12.7568C2 7.23383 6.47705 2.75677 12 2.75677C17.5228 2.75677 22 7.23383 22 12.7568ZM16.0005 11.4239C16.0005 13.633 14.2097 15.4239 12.0005 15.4239C9.79121 15.4239 8.00046 13.633 8.00046 11.4239C8.00046 9.21482 9.79121 7.42394 12.0005 7.42394C14.2097 7.42394 16.0005 9.21482 16.0005 11.4239Z" stroke="white" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            ,
            link: '/login_page'
        },
    ]

    const Show_menu = (e, type) => {
        let switcher = e.target.closest('.ds-navigaion-menu');
        if (!menu) {
            setmenu('datasphere');
            switcher.querySelector('.ds-nav-logo').style.transform = 'rotate(360deg)'
            switcher.style.width = '160px'
        } else {
            setmenu('');
            switcher.querySelector('.ds-nav-logo').style.transform = 'rotate(0deg)'
            switcher.style.width = '45px'

        }
    }

    return (
        <div className='ds-navigaion-menu'>
            <div className='ds-navigation-logo' onClick={(e) => { Show_menu(e) }}>
                <span className={`${'datasphere' === menu ? 'ds-nav-logo active' : 'ds-nav-logo '}`}>
                    {white_logo}
                </span>
                {
                    menu && Header_data?.map((data) => {
                        return (
                            <Link className='ds-nav-toggle-hidden' to={data.link}>
                                <span className={data.label === menu ? 'active' : ''} onClick={() => { setmenu(data.label) }}>
                                    {data.svg}
                                </span>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Header_menu;