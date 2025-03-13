import { useEffect, useState } from "react";

export default function ThemeToogle() {
	const [isDarkTheme, setDarkTheme] = useState<boolean>(false);

	useEffect(() => {
		document.body.classList.toggle("dark-theme");
	}, [isDarkTheme])

	const toogleTheme = () => {
		setDarkTheme(!isDarkTheme);
	}

	return (
		<>
			<img
				className="dark-light-mode"
				src="/src/assets/dark-light-mode-logo.png"
				alt="Logo Dark-Light-Mode"
				title="Logo Dark-Light-Mode"
				aria-label="Logo Dark-Light-Mode" onClick={() => toogleTheme()}
			/>
		</>
	)
}
