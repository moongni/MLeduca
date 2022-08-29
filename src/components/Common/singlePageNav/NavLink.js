import React, { useContext } from 'react';
import { NavContext } from './NavContext';

const NavLink = ({ navLinkId, scrollToId }) => {
	const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);

	const handleClick = () => {
		setActiveNavLinkId(navLinkId);
		document.getElementById(scrollToId).scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div 
			id={navLinkId}
			className={`p-2 w-56 mr-auto inline-block`}
			onClick={handleClick}>
			<span
				className={`${activeNavLinkId === navLinkId ? 'border-b-2 border-slate-300' : ''} opacity-80 cursor-pointer`}
			>
				{navLinkId}
			</span>
		</div>
	);
};

export default NavLink;