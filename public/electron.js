const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");
const { shell } = require('electron')
const sqlite3 = require('sqlite3');
const fs = require('fs');

var options = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
    marginType: 'printableArea'
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: 'Header of the Page',
  footer: 'Footer of the Page'
}

const isMac = process.platform === 'darwin'

console.log(process.env.APPDATA)
const db = new sqlite3.Database(path.join(process.env.APPDATA, './mvogtzone/database.db'));
const schema = fs.readFileSync(path.join(__dirname, './database/schema.sql')).toString();

const dataArr = schema.toString().split(");");

// db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
db.serialize(() => {
  // db.run runs your SQL query against the DB
  db.run("PRAGMA foreign_keys=ON;");
  db.run("BEGIN TRANSACTION;");
  // Loop through the `dataArr` and db.run each query
  dataArr.forEach(query => {
    if (query) {
      // Add the delimiter back to each query before you run them
      // In my case the it was `);`
      query += ");";
      db.run(query, err => {
        if (err) throw err;
      });
    }
  });
  db.run("COMMIT;");
});



ipcMain.on('getprofs-message', (event, arg) => {
  db.all("SELECT * FROM  professeur;", (err, rows) => {
    event.reply('getprofs-reply', (err && err.message) || rows);
  });

});


ipcMain.on('run', (event, arg) => {
  const sql = arg;
  db.run(sql, (err, rows) => {
    if (err) {
      console.log(err)
      event.reply('error-reply')
    }

    else
      event.reply('asynchronous-reply', (err && err.message) || rows);
  });

});


ipcMain.on('getquarter-message', (event, arg) => {
  db.all("", (err, rows) => {
    event.reply('getquarter-reply', (err && err.message) || rows);
  });

});




ipcMain.on('get-message', (event, arg) => {
  db.all(arg, (err, rows) => {
    event.reply('get-reply', [(err && err.message) || rows, arg]);
  });

});


ipcMain.on('printnotation', (event, arg) => {

  let win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  var model = fs.readFileSync(path.join(__dirname, "/bulletin/model.html")).toString()

  db.all(`select * from notation where  teacher_id="${arg[0].matricule}" and trim=${arg[1].id} `, (result, rows) => {
    {

      if (rows.length) {
        var notation = rows[0]

        db.all(`select classe from tranche where teacher_id="${arg[0].matricule}" and trim=${arg[1].id} group by (classe) `, (result, rows) => {


          var classes = []
          console.log(rows)
          for (var c of rows)
            classes.push(c.classe)
          classes.toString()

          var notes = new Object()
          notes.em = (notation.em >= 2) ? 0 : 2

          notes.pc = (notation.pc == 1) ? 4 : 0
          notes.pr = (notation.pr == 1) ? 4 : 0
          notes.ps = (notation.ps == 1) ? 4 : 0
          notes.pag = (notation.pag == 1) ? 4 : 0
          notes.ace = (notation.pce >= 2) ? 0 : 2
          notes.acc = (notation.pcc >= 2) ? 0 : 2

          notes.ra = (notation.ra == 1) ? 4 : 0
          notes.ei = (notation.ei == 1) ? 4 : 0
          notes.re = (notation.re == 1) ? 2 : 0
          notes.car = (notation.car == 1) ? 2 : 0
          notes.tv = (notation.tv == 1) ? 2 : 0
          notes.r = (6 - (notation.r) * 2 > 0) ? 6 - (notation.r) * 2 : 0


          notes.ma = (8 - (notation.ma) * 4 > 0) ? 8 - (notation.ma) * 4 : 0
          notes.cl = (notation.cl == 1) ? 4 : 0
          notes.tct = ((notation.modc == 1) ? 1 : 0)
            + ((notation.chap == 1) ? 1 : 0) +
            ((notation.ca == 1) ? 1 : 0) +
            ((notation.ai == 1) ? 1 : 0) +
            ((notation.stat == 1) ? 1 : 0) +
            ((notation.rdate == 1) ? 1 : 0) +
            ((notation.th == 1) ? 1 : 0) +
            ((notation.planc == 1) ? 1 : 0) +
            ((notation.updatec == 1) ? 1 : 0)

          notes.tra = (4 - (notation.callreg) * 2 > 0) ? 4 - (notation.callreg) * 2 : 0
          notes.cs = (notation.cs == 1) ? 4 : 0
          notes.cc = (notation.cc == 1) ? 4 : 0
          notes.tv = (notation.tv == 1) ? 4 : 0

          notes.rds = (4 - (notation.rds) * 2 > 0) ? 4 - (notation.rds) * 2 : 0

          notes.rdn = (4 - (notation.rdn) * 2 > 0) ? 4 - (notation.rdn) * 2 : 0
          notes.renh = (notation.renh == 1) ? 4 : 0
          notes.rpp = (notation.rpp == 1) ? 4 : 0
          notes.fpc = (notation.fpc == 1) ? 1 : 0
          notes.cp = (notation.cp == 1) ? 4 : 0
          notes.fp = (notation.fp == 1) ? 2 : 0
          notes.rch = (notation.rch == 1) ? 4 : 0
          notes.qc = (notation.qc == 1) ? 4 : 0

          notes.mvt = (4 - (notation.mvt) * 2 > 0) ? 4 - (notation.mvt) * 2 : 0
          notes.mvc = (4 - (notation.mvc) * 2 > 0) ? 4 - (notation.mvc) * 2 : 0
          notes.sp = (notation.sp == 1) ? 4 : 0
          notes.dfsp = (notation.dfsp == 1) ? 2 : 0
          notes.drce = (notation.drce == 1) ? 4 : 0

          notes.prc = (notation.prc == 1) ? 2 : 0

          notes.rpe = (notation.rpe == 1) ? 2 : 0

          notes.dsp = (notation.dsp == 1) ? 2 : 0

          notes.dsp = (notation.dsp == 1) ? 2 : 0
          notes.dch = (notation.dch == 1) ? 12 : 0

          notes.pl = 4
          notes.al = 4

          notes.cge = notes.mvt + notes.mvc + notes.sp + notes.dfsp + notes.drce + notes.prc + notes.rpe + notes.dch + notes.dsp
          notes.apt = notes.ma + notes.cl + notes.tct + notes.tra
          notes.disc = notes.pl + notes.em + notes.al + notes.pc + notes.pr + notes.ps + notes.pag + notes.ace + notes.acc + notes.ra + notes.ei + notes.re + notes.car + notes.tv + notes.r



          var bulletin = model.replace("{trimestre}", arg[1].lib[0]).
            replace("{nom}", arg[0].name)
            .replace("{year}", arg[1].lib.substring(1))
            .replace("{DISCIPLINE}", arg[0].matiere).
            replace("{CLASSES}", classes).
            replace("{DISC}", notes.disc)
            .replace("{pl}", notes.pl)
            .replace("{em}", notes.em)
            .replace("{al}", notes.al).
            replace("{pc}", notes.pc).
            replace("{pr}", notes.pr).
            replace("{ps}", notes.ps).
            replace("{pag}", notes.pag).
            replace("{ace}", notes.ace).
            replace("{acc}", notes.acc).
            replace("{ra}", notes.ra).
            replace("{ei}", notes.ei).
            replace("{re}", notes.re).
            replace("{car}", notes.car).
            replace("{tv}", notes.tv).
            replace("{r}", notes.r).

            replace("{APT}", notes.apt).
            replace("{ma}", notes.ma).
            replace("{cl}", notes.cl)
            .replace("{tct}", notes.tct).
            replace("{tra}", notes.tra).
            replace("{cs}", notes.cs).
            replace("{cc}", notes.cc).
            replace("{rds}", notes.rds).
            replace("{rdn}", notes.rdn).
            replace("{renh}", notes.renh)
            .replace("{rpp}", notes.rpp).
            replace("{fpc}", notes.fpc).
            replace("{cp}", notes.cp).
            replace("{fp}", notes.fp).
            replace("{rch}", notes.rch).
            replace("{qc}", notes.qc).

            replace("{CCE}", notes.cge).
            replace("{mvt}", notes.mvt).
            replace("{mvc}", notes.mvc).
            replace("{sp}", notes.sp)
            .replace("{dfsp}", notes.dfsp).
            replace("{drce}", notes.drce).
            replace("{prc}", notes.prc).
            replace("{rpe}", notes.rpe).
            replace("{dsp}", notes.dsp).
            replace("{dch}", notes.dch)




          win.loadURL(`data:text/html;charset=utf-8,${bulletin}`)

          pdfPath = path.join(__dirname, "bulletin/test.pdf")

          win.webContents.on('did-finish-load', () => {
            win.webContents.printToPDF(options).then((data) => {
              fs.writeFile(pdfPath, data, err => {
                if (err) return console.log(err.message);
                shell.openExternal('file://' + pdfPath);

              })
            });
          });

        })

      }
      else {
        dialog.showErrorBox("aucune notation", "ce professeur n'a pas été noté ce trimestre")
      }

    }



  });
})

let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "mvogtnotation",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,

    },
  });

  const template = [
    {
      label: 'données',
      submenu: [
        {
          click: mainWindow.webContents.send('update-counter', -1),
          label: 'supprimer toutes les données'
        }
      ]
    },


    {
      label: 'aide',
      submenu: [
        {
          label: 'a propos',

        },


        {
          label: 'lire la documentation',
          click: async () => {
            await shell.openExternal('')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  mainWindow.maximize()
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
}


app.on("ready", createWindow);
