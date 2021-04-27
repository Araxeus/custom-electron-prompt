# Custom Electron Prompt

Disclaimer: this package is a highly modified version of  [electron-prompt](https://github.com/p-sam/electron-prompt) 

The author of that package didn't want much contribution or change, but you are more than welcome to contribute and create new stable prompt features over here :)

## Usage

1. Install the npm package to your project directory with
   
   ```bash
   npm install custom-electron-prompt
   ```
   
    or
   
   ```bash
   yarn add custom-electron-prompt
   ```

2. Import folder
   
   ```javascript
   const prompt = require('custom-electron-prompt')
   ```

3. Create prompt
   
   ```javascript
   prompt([options, parentBrowserWindow])
   ```
   
   calling prompt function returns a Promise
   
   Promise resolve returns the input or returns null if prompt was canceled

       On error, Prompise reject returns custom error message

### Simple Example

```javascript
const prompt = require('./prompt');

prompt({
    title: 'Prompt example',
    label: 'URL:',
    value: 'http://example.org',
    inputAttrs: {
        type: 'url'
    },
    type: 'input'
})
.then((r) => {
    if(r === null) {
        console.log('user cancelled');
    } else {
        console.log('result', r);
    }
})
.catch(console.error);
```

### Special Prompt Types

#### keybind

Create a prompt with possibly multiple keybind selects

Must specify `keybindOptions` with valid entries in format:

```javascript
keybindOptions: [
    { value: "copyAccelerator", label: "Copy", default: "Ctrl+C" }
    { value: "pasteAccelerator", label: "Paste", default: "Ctrl+V" }
]
```

Return an array made of objects in format 

`{value: "copyAccelerator", accelerator: "Ctrl+Shift+Insert"}` 

where `accelerator` is the input for the `value` you registered

Code Example:

Pictures:

#### counter

Create a prompt for selecting numeric values, with integrated `+` and `-` buttons

You **can** specify `counterOptions` with valid entries in format:

```javascript
counterOptions: {
    minimum: 0, //defaults to null
    maximum: 250, //defaults to null
    multiFire: true` //default to false
}
```

 minimum and maximum of numeric counter, and multifire indicate if continuous input is enabled.

Code Example:

Pictures:

#### select

Create a prompt with a dropdown select menu.

Must specify selectOptions with valid entries in **one** of the following format:

```javascript
 selectOptions: ["thisReturn0", "thisReturn1", "thisReturn2"]
 selectOptions: {
     0: "thisReturn0",
     1: "thisReturn1",
     2: "imSelected",
     potato: "thisReturnPotato"
 }
```

Code Example:

Pictures:

### Options object (optional)

#### ⚠️ New options :

| Key                | Explanation                                                                                                                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| frame              | (optional, boolean) Wether to create prompt with frame. Defaults to true.                                                                                                                                                                                      |
| customScript       | (optional, string) The local path of a JS file to run on preload. Defaults to null.                                                                                                                                                                            |
| enableRemoteModule | (optional, boolean) Wether the prompt window have remote modules activated, Defaults to false.                                                                                                                                                                 |
| customStylesheet   | (optional, string) The local path of a CSS file to customize the style of the prompt window, **you can use just "dark" to use the premade dark skin**. Defaults to null.                                                                                       |
| type               | (optional, string) The type of input field, either 'input' for a standard text input field or 'select' for a dropdown type input or **`counter` for a number counter with buttons.** or **`keybind` for an electron accelerator grabber** Defaults to 'input'. |
| counterOptions     | (optional, object) minimum and maximum of counter, and if continuous input is enabled. format: `{minimum: %int%, maximum: %int%, multiFire: %boolean%`. min+max values defaults to null and multiFire defaults to false.                                       |
| keybindOptions     | (optional, object)  Required if type=keybind. represent an array of objects in format: `{type: %string%, value: %string%, default: %string%}`. `default` has to be a valid accelerator to work                                                                 |

#### Original options:

| Key            | Explanation                                                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title          | (optional, string) The title of the prompt window. Defaults to 'Prompt'.                                                                                                                                                       |
| label          | (optional, string) The label which appears on the prompt for the input field. Defaults to 'Please input a value:'.                                                                                                             |
| buttonLabels   | (optional, object) The text for the OK/cancel buttons. Properties are 'ok' and 'cancel'. Defaults to null.                                                                                                                     |
| value          | (optional, string) The default value for the input field. Defaults to null.                                                                                                                                                    |
| type           | (optional, string) The type of input field, either 'input' for a standard text input field or 'select' for a dropdown type input or 'counter' for a number counter with buttons. Defaults to 'input'.                          |
| inputAttrs     | (optional, object) The attributes of the input field, analagous to the HTML attributes: `{type: 'text', required: true}` -> `<input type="text" required>`. Used if the type is 'input'.                                       |
| selectOptions  | (optional, object) The items for the select dropdown if using the 'select' type in the format 'value': 'display text', where the value is what will be given to the then block and the display text is what the user will see. |
| useHtmlLabel   | (optional, boolean) Whether the label should be interpreted as HTML or not. Defaults to false.                                                                                                                                 |
| width          | (optional, integer) The width of the prompt window. Defaults to 370.                                                                                                                                                           |
| minWidth       | (optional, integer) The minimum allowed width for the prompt window. Default to width if specified or default_width(370).                                                                                                      |
| height         | (optional, integer) The height of the prompt window. Defaults to 130.                                                                                                                                                          |
| minHeight      | (optional, integer) The minimum allowed height for the prompt window. Default to height if specified or default_height(160).                                                                                                   |
| resizable      | (optional, boolean) Whether the prompt window can be resized or not (also sets useContentSize). Defaults to false.                                                                                                             |
| alwaysOnTop    | (optional, boolean) Whether the window should always stay on top of other windows. Defaults to false                                                                                                                           |
| icon           | (optional, string) The path to an icon image to use in the title bar. Defaults to null and uses electron's icon.                                                                                                               |
| menuBarVisible | (optional, boolean) Whether to show the menubar or not. Defaults to false.                                                                                                                                                     |
| skipTaskbar    | (optional, boolean) Whether to show the prompt window icon in taskbar. Defaults to true.                                                                                                                                       |

If not supplied, it uses the defaults listed in the table above.

### parentBrowserWindow (optional)

The window in which to display the prompt on. If not supplied, the parent window of the prompt will be null.

### customScript (optional)

Create the script with the following template:

```node
module.exports = () => {
    // This function will be called as a preload script
    // So you can use front features like `document.querySelector`
};
```
