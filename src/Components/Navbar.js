import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
	selectSignedIn,
	selectUserData,
	setInput,
	setSignedIn,
	setUserData,
} from "../features/userSlice";

import "../styling/navbar.css";

const Navbar = () => {
	const [inputValue, setInputValue] = useState("tech");
	const isSignedIn = useSelector(selectSignedIn);
	const userData = useSelector(selectUserData);

	const dispatch = useDispatch();

	const logout = (response) => {
		dispatch(setSignedIn(false));
		dispatch(setUserData(null));
	};
	const handleClick = (e) => {
		e.preventDefault();
		dispatch(setInput(inputValue));
	};

	return (
		<div className="navbar">
			<h1 className="navbar__header">Bloggy 💬</h1>
			{isSignedIn && (
				<div className="blog__search">
					<input
						className="search"
						placeholder="Search for a blog"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button className="submit" onClick={handleClick}>
						Search
					</button>
				</div>
			)}

			{isSignedIn ? (
				<div className="navbar__user__data">
					<Avatar
						className="user"
						src={userData?.imageUrl}
						alt={userData?.name}
					/>
					<h1 className="singedIn">{userData?.givenName}</h1>
					<GoogleLogout
						clientId="388449702891-8en0m1gt3s8n851m6q3dinucm7v037h6.apps.googleusercontent.com"
						render={(renderProps) => (
							<button
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								className="logout__button"
							>
								Logout 😦
							</button>
						)}
						buttonText="Logout"
						onLogoutSuccess={logout}
					/>
				</div>
			) : (
				<h1 className="notSingedIn">User not available 😞 </h1>
			)}
		</div>
	);
};

export default Navbar;
