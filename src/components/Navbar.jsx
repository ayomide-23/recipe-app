import './Navbar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='logo'>
                <a href='/'>FlavorHub</a>
            </div>
            <div className="categories">
                <a href='#categories'>Categories</a>
            </div>
            <div className='about'>
                <a href='#about'>About</a>
            </div>
        </nav>
    );
};

export default Navbar;