const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

function getAppPath() {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'app');
    }
    return path.resolve(__dirname, '../..');
}

function startServer(appPath) {
    const serverPath = path.join(appPath, 'app.js');
    console.log('Starting server from:', serverPath);

    // Use process.execPath with ELECTRON_RUN_AS_NODE=1 so packaged app
    // doesn't rely on a system 'node' binary that won't exist.
    // Pass ELECTRON_USERDATA so app.js uses the correct userData path
    // instead of trying to call app.getPath() in a child process (which throws).
    serverProcess = spawn(process.execPath, [serverPath], {
        cwd: appPath,
        env: {
            ...process.env,
            ELECTRON_RUN_AS_NODE: '1',
            ELECTRON_USERDATA: app.getPath('userData')
        }
    });

    serverProcess.stdout.on('data', (data) => {
        console.log('Server:', data.toString().trim());
    });

    serverProcess.stderr.on('data', (data) => {
        console.error('Server Error:', data.toString().trim());
    });

    serverProcess.on('error', (err) => {
        console.error('Failed to start server:', err);
    });

    serverProcess.on('exit', (code) => {
        console.log('Server exited with code:', code);
    });
}

function loadWithRetry(win, url, maxAttempts = 20, interval = 500) {
    let attempts = 0;

    const tryLoad = () => {
        attempts++;
        console.log(`Attempting to connect to ${url} (attempt ${attempts}/${maxAttempts})`);

        win.loadURL(url).then(() => {
            console.log('App loaded successfully.');
        }).catch((err) => {
            if (attempts < maxAttempts) {
                setTimeout(tryLoad, interval);
            } else {
                console.error('Failed to load app after max attempts:', err.message);
            }
        });
    };

    // Give the server a brief head-start before first attempt
    setTimeout(tryLoad, interval);
}

function createWindow() {
    Menu.setApplicationMenu(null);

    const appPath = getAppPath();

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 900,
        minHeight: 600,
        icon: path.join(appPath, 'data', 'gear.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        backgroundColor: '#000000',
        show: false,
        frame: true,
        autoHideMenuBar: true,
        title: 'Command Manager'
    });

    startServer(appPath);
    loadWithRetry(mainWindow, 'http://localhost:3000');

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (!url.startsWith('http://localhost:3000')) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        if (serverProcess && !serverProcess.killed) {
            serverProcess.kill();
        }
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (serverProcess && !serverProcess.killed) {
        serverProcess.kill();
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('open-external', async (event, url) => {
    await shell.openExternal(url);
    return true;
});
