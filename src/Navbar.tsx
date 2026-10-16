import './App.css';

export default function Navbar() {

    return(
        <div className='navbar'>
            <div className='navbar-logo'>
                <a href='#hero'><img src='src/assets/White on Transparent@2x_190224.png' width={120} height={'auto'}/></a>
            </div>
            <div className='navbar-links'>
                <a href="#work">WORK</a>
                <a href="#careers">CAREERS</a>
                <a href="#contact">CONTACT</a>
            </div>
        </div>
    )
}