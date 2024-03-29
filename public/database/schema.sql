CREATE TABLE IF NOT EXISTS professeur(
    matricule VARCHAR(6) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    matiere VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS Trimestre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lib VARCHAR(10) NOT NULL
);
create table IF NOT EXISTS Notation (
    trim integer NOT NULL,
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    teacher_id VARCHAR(6) NOT NULL,
    em integer default 0,
    pc boolean default TRUE,
    pr boolean default TRUE,
    ps boolean default TRUE,
    pag boolean default TRUE,
    ace integer default 0,
    acc integer default 0,
    ra boolean default true,
    ei boolean default true,
    re boolean default true,
    car boolean default true,
    tv boolean default true,
    r integer default 0,
    ma integer default 0,
    cl boolean default true,
    modc boolean default true,
    chap boolean default true,
    ca boolean default true,
    ai boolean default true,
    stat boolean default true,
    rdate boolean default true,
    th boolean default true,
    planc boolean default true,
    updatec boolean default true,
    callreg integer default 0,
    cs boolean default true,
    cc boolean default true,
    rds integer default 0,
    qs boolean default true,
    rdn integer default 0,
    renh boolean default true,
    rpp boolean default true,
    fpc boolean default true,
    cp boolean default true,
    fp boolean default true,
    rch boolean default true,
    qc boolean default true,
    mvt integer default 1,
    mvc integer default 1,
    sp boolean default true,
    dfsp boolean default true,
    drce boolean default true,
    prc boolean default true,
    rpe boolean default true,
    dsp boolean default true,
    dch boolean default true,
    classed boolean default false,
    titulaire boolean default false,
    observation TEXT DEFAULT "fait de son mieux",
    FOREIGN KEY (teacher_id) REFERENCES professeur (matricule) ON DELETE CASCADE,
    FOREIGN KEY (trim) REFERENCES Trimestre(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS tranche (
    periode VARCHAR(3) NOT NULL,
    teacher_id VARCHAR(10) NOT NULL,
    trim INTEGER NOT NULL,
    classe VARCHAR(13) default "",
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    FOREIGN KEY (trim) REFERENCES Trimestre(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES professeur (matricule) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS programs (
    notationid integer NOT NULL,
    classname VARCHAR(10) NOT NULL,
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    FOREIGN KEY (notationid) REFERENCES Notation(id) ON DELETE CASCADE,
    FOREIGN KEY (classname) REFERENCES classe (nom) ON DELETE CASCADE
);
create TABLE IF NOT EXISTS retard (
    motif TEXT,
    val INTEGER DEFAULT 30,
    class VARCHAR(12),
    datea DATE,
    notationid integer NOT NULL,
    FOREIGN KEY (notationid) REFERENCES Notation (id) ON DELETE CASCADE
);
create TABLE IF NOT EXISTS absence (
    motif TEXT,
    class VARCHAR(12),
    datea DATE,
    notationid integer NOT NULL,
    FOREIGN KEY (notationid) REFERENCES Notation (id) ON DELETE CASCADE
);
create TABLE IF NOT EXISTS classe (nom VARCHAR(12) NOT NULL PRIMARY KEY);
INSERT
    OR IGNORE INTO classe
VALUES("terminale b");
INSERT
    OR IGNORE INTO classe
VALUES("terminale A");
INSERT
    OR IGNORE INTO classe
VALUES("terminale c");
INSERT
    OR IGNORE INTO classe
VALUES("terminale d");
INSERT
    OR IGNORE INTO classe
VALUES("terminale ses");
INSERT
    OR IGNORE INTO classe
VALUES("premiere A");
INSERT
    OR IGNORE INTO classe
VALUES("premiere b");
INSERT
    OR IGNORE INTO classe
VALUES("premiere c");
INSERT
    OR IGNORE INTO classe
VALUES("premiere d");
INSERT
    OR IGNORE INTO classe
VALUES("premiere ses");
INSERT
    OR IGNORE INTO classe
VALUES("seconde a");
INSERT
    OR IGNORE INTO classe
VALUES("seconde b");
INSERT
    OR IGNORE INTO classe
VALUES("seconde c");
INSERT
    OR IGNORE INTO classe
VALUES("seconde d");
INSERT
    OR IGNORE INTO classe
VALUES("seconde ses");
INSERT
    OR IGNORE INTO classe
VALUES("troizieme a");
INSERT
    OR IGNORE INTO classe
VALUES("troizieme b");
INSERT
    OR IGNORE INTO classe
VALUES("quatrieme a");
INSERT
    OR IGNORE INTO classe
VALUES("quatrieme b");
INSERT
    OR IGNORE INTO classe
VALUES("cinquieme m1");
INSERT
    OR IGNORE INTO classe
VALUES("cinquime m2");
INSERT
    OR IGNORE INTO classe
VALUES("sixieme m1");
INSERT
    OR IGNORE INTO classe
VALUES("sixieme m2");