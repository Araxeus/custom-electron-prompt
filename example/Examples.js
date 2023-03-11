/** Counter Prompt **/
prompt(
    {
        title: 'Counter',
        label: 'Choose a number:',
        value: '59',
        type: 'counter',
        counterOptions: { minimum: -69, maximum: null, multiFire: true },
        resizable: true,
        height: 150,
        width: 300,
        customStylesheet: 'dark',
    },
    win,
)
    .then((input) => {
        console.log(`input == ${input}`);
    })
    .catch(console.error);

/** Select Prompt **/
prompt(
    {
        title: 'Select',
        label: 'Choose an option:',
        type: 'select',
        value: '2',
        selectOptions: [
            'thisReturn0',
            'thisReturn1',
            'imSelected',
            'thisReturn3',
        ],
        // 	selectOptions: {0: "thisReturn0", 1: "thisReturn1", 2: "imSelected" , potato: "thisReturnPotato"},
        resizable: true,
        height: 150,
        width: 300,
        customStylesheet: 'dark',
    },
    win,
)
    .then((input) => {
        console.log(`input == ${input}`);
    })
    .catch(console.error);

/** Accelelerator Prompt **/
const kb = ($value, $label, $default) => {
    return { value: $value, label: $label, default: $default };
};
prompt(
    {
        title: 'Keybinds',
        label: 'Select keybind for each method',
        type: 'keybind',
        value: '2',
        keybindOptions: [
            {
                value: 'volumeUp',
                label: 'Increase Volume',
                default: 'Shift+PageUp',
            },
            kb('volumeDown', 'Decrease Volume', 'Shift+PageDown'),
            kb('playPause', 'Play / Pause'), // (null || empty string || undefined) == no default
        ],
        resizable: true,
        customStylesheet: 'dark',
    },
    win,
)
    .then((input) => {
        if (input) input.forEach((obj) => console.log(obj));
        else console.log('Pressed Cancel');
    })
    .catch(console.error);
