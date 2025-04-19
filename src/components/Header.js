import React from 'react';

const Header = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <nav>
            <h1>Welcome to the App</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Header;
