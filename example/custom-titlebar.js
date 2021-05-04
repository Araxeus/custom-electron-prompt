// this file could be used as a custom script, to use a custom titlebar

const customTitlebar = require("custom-electron-titlebar");

module.exports = () => {
	const bar = new customTitlebar.Titlebar({
		backgroundColor: customTitlebar.Color.fromHex("#050505"),
		minimizable: false,
		maximizable: false,
		menu: null
	});
	const mainStyle = document.querySelector("#container").style;
	mainStyle.width = "100%";
	mainStyle.position = "fixed";
	mainStyle.border = "unset";
};
