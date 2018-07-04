//Written by Neil McHenry on June 7th, 2018
//If you'd like to edit the non-packaged applciation
//install Node.JS and electron (nodeJS package manager)
//     Tutorial on installing through npm: https://www.christianengvall.se/install-electron-tutorial-app/
//     Tutorial on writing electron apps: https://electronjs.org/docs/tutorial/first-app
//     Type "npm install" to install any missing dependencies (such as the node_modules folder)
//     Type "npm start" in your terminal within the launcher directory to start the app

const electron = require('electron');
const url = require('url');
const path = require('path');

//ipcMain is used to catch the item from the ipcRenderer send function in addWindow
const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV
// process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({
        //Set the icon to the SpaceCRAFT Logo
        icon:'logo16px.ico'
        //Creates a borderless window
        // frame: false
    });

    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));

    // Quit app when closed
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
        label:'System Management',
        //add a submenu to the menu
        submenu:[
            {
                label: 'Add System',
                //Checks which platform user is on and adds hotkey to menu
                accelerator: process.platform == 'darwin' ? 'Command+S' :
                'Ctrl+S',
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