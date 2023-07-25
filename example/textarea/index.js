// https://www.electronjs.org/docs/latest/tutorial/quick-start
"use strict";

const { app, Menu, BrowserWindow, ipcMain, shell, remote, dialog } = require('electron');

const fs         = require('fs');
const path       = require('path');
const mkdirp     = require('mkdirp');
const getDirName = require('path').dirname;

const prompt     = require('../../lib/index.js');

const MAIN_WINDOW_WIDTH  = 1000;
const MAIN_WINDOW_HEIGHT = 600; 

var gMainWindow      = null;
let devTools_enabled = false;

const menu_template = [
	{ 	label: 'File',
		submenu: [
			{ 	label: 'Quit', 
				click() { app.quit(); }
			},
		]
	},
	{ 	label: 'Tests',
		submenu: [
			{ 	label: 'Multiple lines text input (textarea)',
				click() { 
					let user_input_text = readTextFromTextArea();
				}		 
			}
		]
	},
	{ 	label: 'View',
		submenu: [
			{ 	label: 'Toggle Developer Tools', type: 'checkbox',
				click() {  ipcMain_toggleDeveloperTools();  }		 
			}
		]
	},
]; // menu_template

// Create gMainWindow, load the rest of the app, etc...
app.whenReady().then(() => {
	createWindow();
})

//==================== createWindow() ====================
const createWindow = () => {
	// to Hide 'Security Warning'
	process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
	
	console.log(__dirname);
	gMainWindow = new BrowserWindow({
		width:  MAIN_WINDOW_WIDTH, height: MAIN_WINDOW_HEIGHT,
		webPreferences: {
				contextIsolation: true
			}
		});
	
	const menu_bar = Menu.buildFromTemplate(menu_template);
	Menu.setApplicationMenu(menu_bar);

	gMainWindow.loadFile('./index.html');
} // createWindow()
//==================== createWindow()

const readTextFromTextArea = async() => {
	console.log(">> readTextFromTextArea");
	let content_text = "";

	async function getTextFromUserInput() {
		// https://araxeus.github.io/custom-electron-prompt/
		const x = await prompt({
			title: 'Text pattern source: User Input',
			label: 'Enter your text here:',
			value: 'http://example.org',
			height: 365,
			width:  580,
			type: 'textarea',
			inputAttrs: { 'cols': 65, 'rows': 15 }
		}).then((r) => {
			if (r === null) {
				console.log('user cancelled');
			} else {
				console.log('result', r);
				content_text = r;
			}
		}
	  )
	  .catch(console.error);
	}

	await getTextFromUserInput();
	console.log(' readTextFromTextArea content_text: \n' + content_text);

	return content_text;
} // readTextFromTextArea()

function ipcMain_toggleDeveloperTools() {
	console.log('[Electron]' + ' ipcMain_toggleDeveloperTools');
	if (devTools_enabled) {
		gMainWindow.webContents.closeDevTools();
	}
	else{
		gMainWindow.webContents.openDevTools();
	}
	devTools_enabled = ! devTools_enabled;
} // ipcMain_toggleDeveloperTools()