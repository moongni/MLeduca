import React from 'react';
import NavLink from './NavLink';
import { navLinks } from './navLinks';
// import './Nav.css';

const Nav = () => {
	return (
		<nav className='relative text-left'>
			{navLinks.map(({ navLinkId, scrollToId }, idx) => (
				<NavLink 
					key={idx} 
					navLinkId={navLinkId} 
					scrollToId={scrollToId} 
				/>
			))}
		</nav>
	);
};

export default Nav;