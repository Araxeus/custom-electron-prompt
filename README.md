# ✨ Custom Electron Prompt (with 'textarea' feature) ✨

[![NPM Version](https://img.shields.io/npm/v/custom-electron-prompt)](https://www.npmjs.com/package/custom-electron-prompt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Araxeus/custom-electron-prompt/blob/main/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Araxeus/custom-electron-prompt)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://araxeus.github.io/custom-electron-prompt)

This is a customized version of *custom-electron-prompt* with multiple lines text input.
This repository is a fork from [custom-electron-prompt](https://github.com/Araxeus/custom-electron-prompt)

Originally 5 types are available: Input / Keybind / Counter / Select / MultiInput

I've added: Textarea

There is also an option for a button with user-defined `onclick` function.

## Example of a Simple Prompt from Input Type

![](https://github.com/Araxeus/custom-electron-prompt/blob/main/screenshots/Input/Input.png)
![](https://github.com/Araxeus/custom-electron-prompt/blob/main/screenshots/Input/InputDark.png)

## Usage

* 1: Install the npm package to your project directory with
  ```bash
  npm install custom-electron-prompt
  ```

* 2: Test
  0. Start demo app with a double click on `_run.bat`
  1. Open "Text area dialog box" with menu `Tests/Textarea user input`

### Example of Multiple lines text input (cf. 'textarea' entity in HTML)

```javascript
const prompt = require('custom-electron-prompt');

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
```

<details>
  <summary> Screenshots </summary>
  
![](https://github.com/Echopraxium/custom-electron-prompt/blob/main/screenshots/Textarea/sweetalert2_with_textarea.png)

</details>

----

> Disclaimer: this package is a modified version of  [custom-electron-prompt](https://github.com/p-sam/electron-prompt)
> The author seems open to contributions or changes "you are more than welcome to contribute and create new stable prompt features over here :)"
