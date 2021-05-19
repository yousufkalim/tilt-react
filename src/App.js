import "./App.css";
import React from "react";
import Home from "./Components/Home";
import Comment from "./Components/Comment/index";
import Feature from "./Components/Features/index";
import Apps from "./Components/Apps/index";
import Footer from "./Components/Footer/index";
import CookieConsent from "react-cookie-consent";
function App() {
	return (
		<React.Fragment>
			<Home />
			<Comment />
			<Feature />
			<Apps />
			<Footer />
			<CookieConsent
				debug={true}
				style={{ background: "#2B373B" }}
				buttonStyle={{
					color: "#4e503b",
					fontSize: "16px",
					borderRadius: "5px",
				}}
				expires={365}
			>
				{" "}
				This website uses cookies to improve your user experience.
			</CookieConsent>
		</React.Fragment>
	);
}

export default App;
