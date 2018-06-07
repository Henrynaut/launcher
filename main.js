//Written by Neil McHenry on June 7th, 2018

const electron = require('electron');
const url = require('url');
const path = require('path');

//ipcMain is used to catch the item from the ipcRenderer send function in addWindow
const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    // Quite app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow(){
    // Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title:'Add Package to List'
    });
    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    // Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    });
}

// Catch item add from addWindow.html
ipcMain.on('item:add',function(e, item){
    //item:add is the object being caught
    mainWindow.webContents.send('item:add', item);
    //Close the new window after submission
    addWindow.close();
});

// Create menu template
const mainMenuTemplate = [
    {
        //Creates a menu called File
        label:'File',
        //add a submenu to the menu
        submenu:[
            {
                label: 'Add System',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Systems',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: 'Quit',
                //Checks which platform user is on and adds hotkey to menu
                accelerator: process.platform == 'darwin' ? 'Command+Q' :
                'Ctrl+Q',
                click(){
                    //Quits the application on click or hotkey press
                    app.quit();
                }
            }
        ]
    }
];

// If mac, add empty object to menu so that File isn't replaced with Electron
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' :
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}