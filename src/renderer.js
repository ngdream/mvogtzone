const electron = window.require('electron');
const { ipcRenderer ,shell} = electron;

export function getprofs() {
   
    return new Promise((resolve) => {
        ipcRenderer.once('getprofs-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('getprofs-message');
    });
}

export function get(sql) {

    const res = (resolve) =>
    {
        ipcRenderer.once('get-reply', (_, arg) => {
            if(arg[1]==sql)
                resolve(arg[0]);
            else
                res(resolve)

        });
        }
     
    return new Promise((resolve) => {

        res(resolve)
        ipcRenderer.send('get-message',sql);
    });
}

export function getallquarters() {
   
    return new Promise((resolve) => {
        ipcRenderer.once('getallquarters-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('getallquarters-message');
    });
}


export function getquarters(matricule) {
   
    return new Promise((resolve) => {
        ipcRenderer.once('getquarter-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('getquarter-message');
    });
}



export function run(message) {
    return new Promise((resolve) => {

        ipcRenderer.once('asynchronous-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('run', message);
    });
}


export function handleerror(callback)
{

    ipcRenderer.once('error-reply', (_, arg) => {
        callback()
    });
}


export function PrintNotation() {
    
        ipcRenderer.send('printnotation', [window.selected, window.trimestre]);
    
  
}


export function openexternal(e,url)
{
console.log(url)
shell.openExternal(url)
}





