import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, FormGroup, MenuItem, Select, Table, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { get, PrintNotation, run } from '../../renderer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Classeselect = (props) => {
  const { notation } = props
  var [programs, setprograms] = React.useState([])

  async function init() {
    const programs = await get(`select  classname from programs where notationid =${notation.id} `)
    setprograms(programs)
  }

  init()
  return (
    <Select

      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      fullWidth
    >
      {

        programs.map((program) => {

          return (<MenuItem value={program.classname}>{program.classname}</MenuItem>)
        })
      }
    </Select>

  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{
          p: 3, width: "100%"
        }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Autres(props) {
  const { notation, setvalue } = props

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-number"
        label="manquement aux visites des cahier de texte "
        type="number"
        onChange={(e) => { setvalue(e.target.value, "mvt") }}
        value={notation.mvt}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ m: 1 }} />

      <TextField
        id="standard-number"
        label="manquement visite des cours"
        type="number"
        onChange={(e) => { setvalue(e.target.value, "mvc") }}
        value={notation.mvc}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ m: 1 }} />


      <FormGroup style={{
        width: "100%"
      }}>
        <FormControlLabel control={<Checkbox checked={notation.sp} onChange={(e) => { setvalue(e.target.checked, "sp") }}
        />} label="suivi des cours harmonisés" />

        <FormControlLabel control={<Checkbox checked={notation.dfsp} onChange={(e) => { setvalue(e.target.checked, "dfsp") }} />} label="Dépot des fichiers de suivi pédagogiques" />
        <FormControlLabel control={<Checkbox checked={notation.drce} onChange={(e) => { setvalue(e.target.checked, "drce") }} />} label="Dépot des rapport du conseil d'enseignement" />
        <FormControlLabel control={<Checkbox checked={notation.prc} onChange={(e) => { setvalue(e.target.checked, "prc") }} />} label="présence au réunion de coordination " />
        <FormControlLabel control={<Checkbox checked={notation.rpe} onChange={(e) => { setvalue(e.target.checked, "rpe") }} />} label="Rapport avec la préfecture des études" />
        <FormControlLabel control={<Checkbox checked={notation.dsp} onChange={(e) => { setvalue(e.target.checked, "dsp") }} />} label="Dépot des sujets dans les préfectures" />
        <FormControlLabel control={<Checkbox checked={notation.dch} onChange={(e) => { setvalue(e.target.checked, "dch") }} />} label="Dépot des cours Harmonisés" />

      </FormGroup>


    </Box>

  )
}

function Aptitudes(props) {
  const { notation, setvalue } = props
  console.log(notation)
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-number"
        label="manque de maitrise de la classe "
        type="number"
        onChange={(e) => { setvalue(e.target.value, "ma") }}
        value={notation.ma}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ m: 1 }} />




      <FormGroup style={{
        width: "100%"
      }}>
        <FormControlLabel control={<Checkbox checked={notation.cl} onChange={(e) => { setvalue(e.target.checked, "cl") }}
        />} label="Module" />

        <FormControlLabel control={<Checkbox checked={notation.modc} onChange={(e) => { setvalue(e.target.checked, "modc") }}
        />} label="Module" />
        <FormControlLabel control={<Checkbox checked={notation.chap} onChange={(e) => { setvalue(e.target.checked, "chap") }}
        />} label="Chapite / lecon" />
        <FormControlLabel control={<Checkbox checked={notation.ca} onChange={(e) => { setvalue(e.target.checked, "ca") }} />} label="les CA / les objectifs" />
        <FormControlLabel control={<Checkbox checked={notation.ai} onChange={(e) => { setvalue(e.target.checked, "ai") }} />} label="activités d'intégration" />
        <FormControlLabel control={<Checkbox checked={notation.stat} onChange={(e) => { setvalue(e.target.checked, "stat") }} />} label="statistique (d'evaluation)" />
        <FormControlLabel control={<Checkbox checked={notation.rdate} onChange={(e) => { setvalue(e.target.checked, "rdate") }} />} label="data" />
        <FormControlLabel control={<Checkbox checked={notation.th} onChange={(e) => { setvalue(e.target.checked, "th") }} />} label="les tranches horaires" />
        <FormControlLabel control={<Checkbox checked={notation.planc} onChange={(e) => { setvalue(e.target.checked, "planc") }} />} label="plans des cours" />
        <FormControlLabel control={<Checkbox checked={notation.updatec} onChange={(e) => { setvalue(e.target.checked, "updatec") }} />} label="cahier à jour" />
      </FormGroup>


      <TextField
        id="standard-number"
        label="manque de tenue registre d'appel"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ m: 1 }}
        onChange={(e) => { setvalue(e.target.value, "callreg") }}
        value={notation.callreg}
      />

      <FormGroup style={{
        width: "100%"
      }}>
        <FormControlLabel control={<Checkbox checked={notation.qs} onChange={(e) => { setvalue(e.target.value, "qs") }} />} label="sujet de qualité" />
        <FormControlLabel control={<Checkbox checked={notation.cs} onChange={(e) => { setvalue(e.target.checked, "cs") }} />} label="confection des sujets" />
        <FormControlLabel control={<Checkbox onChange={(e) => { setvalue(e.target.checked, "cc") }} checked={notation.cc} />} label="confection des corrigés" />

      </FormGroup>


      <TextField
        id="standard-number"
        label="retard delais depot sujet"
        onChange={(e) => { setvalue(e.target.value, "rds") }}
        type="number"
        sx={{ m: 1 }}
        InputLabelProps={{
          shrink: true,
        }}
        value={notation.rds}
      />

      <TextField
        id="standard-number"
        label="retard delais depot notes"
        type="number"
        sx={{ m: 1 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => { setvalue(e.target.value, "rdn") }}
        value={notation.rdn}

      />




      <FormGroup style={{
        width: "100%"
      }}>
        <FormControlLabel control={<Checkbox onChange={(e) => { setvalue(e.target.checked, "renh") }} checked={notation.renh} />} label="évaluation non harmonisés" />

      </FormGroup>




      <FormGroup style={{
        width: "100%"
      }}>
        <FormControlLabel control={<Checkbox checked={notation.rpp} onChange={(e) => { setvalue(e.target.checked, "rpp") }} />} label="respect des programmes de progression" />
        <FormControlLabel control={<Checkbox onChange={(e) => { setvalue(e.target.checked, "fpc") }} checked={notation.fpc} />} label="fiche de progression collée" />
        <FormControlLabel control={<Checkbox onChange={(e) => { setvalue(e.target.checked, "cp") }} checked={notation.cp} />} label="cahier de préparation" />
        <FormControlLabel control={<Checkbox onChange={(e) => { setvalue(e.target.checked, "fp") }} checked={notation.fp} />} label="respect des cours harmonisés" />
        <FormControlLabel control={<Checkbox onChange={(e) => { setvalue(e.target.checked, "rch") }} checked={notation.rch} />} label="resprect des cours harmonisés" />
        <FormControlLabel control={<Checkbox onChange={(e) => { setvalue(e.target.checked, "qc") }} checked={notation.qc} />} label="qualités du cours" />

      </FormGroup>

    </Box>
  )
}




function Retard(props) {

  const { retard, handleclose, notation } = props
  const [addretard, setaddretard] = React.useState(false)
  function handlecloseadd() {
    setaddretard(false)
  }
  const [val, setval] = React.useState(30)
  const [classe, setclasse] = React.useState("")
  const [motif, setmotif] = React.useState("")
  const [retards, setretards] = React.useState([])

  const add = async () => {
    console.log(`${notation.id},${val},"${motif}"`)
    await run(`insert into retard (notationid,val,motif) values (${notation.id},${val},"${motif}")`)
    update()
    handlecloseadd()
  }

  const update = async () => {
    const retards = await get(`select * from retard where notationid =${notation.id} `)
    setretards(retards)
  }


  React.useEffect(
    () => {
      update()
    },
    []
  )
  return (

    <Dialog open={retard} onClose={handleclose}>
      <DialogTitle>gerer les retards de ce professeur</DialogTitle>

      <DialogContent>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>jour</TableCell>
              <TableCell>temps</TableCell>
              <TableCell>classe</TableCell>
            </TableRow>
          </TableHead>
          {
            retards.map(retard => {

              return (<TableRow hover>

                <TableCell>{retard.dater}</TableCell>
                <TableCell>{retard.val}min</TableCell>
                <TableCell>{retard.class}</TableCell>
              </TableRow>)
            })
          }

        </Table>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleclose}>fermer</Button>
        <Button onClick={() => { setaddretard(true) }}>ajouter</Button>
      </DialogActions>
      <Dialog open={addretard} onClose={handlecloseadd}>
        <DialogTitle>ajouter un retard</DialogTitle>
        <DialogContent>

          <Classeselect notation={notation} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                width: "100%",
                marginTop: 5
              }}
              onChange={(e, value) => { console.log(value) }} />
          </LocalizationProvider>

          <TextField
            id="value"
            label="nombre de minute de retard"
            type={"number"}
            fullWidth
            onChange={(e) => { setval(e.target.value) }}
            sx={{
              marginTop: 5
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="motif du retard"
            value={motif}
            multiline
            fullWidth
            sx={{
              marginTop: 5
            }}
            Rows={4}
            onChange={(e) => { setmotif(e.target.value) }}
            InputLabelProps={{
              shrink: true,
            }}
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={handlecloseadd}>annuler</Button>
          <Button onClick={add}>ajouter</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}


function Absence(props) {

  const { absence, handleclose, notation } = props
  const [addabsence, setaddabsence] = React.useState(false)

  function handlecloseadd() {
    setaddabsence(false)
  }

  const [val, setval] = React.useState(30)
  const [classe, setclasse] = React.useState("")
  const [motif, setmotif] = React.useState("")
  const [absences, setabsences] = React.useState([])

  const add = async () => {
    await run(`insert into absence (notationid,val,motif) values (${notation.id},${val},"${motif}")`)
    update()
    handlecloseadd()
  }

  const update = async () => {
    const absences = await get(`select * from absence where notationid = ${notation.id} `)
    setabsences(absences)
    console.log(absences)

  }


  React.useEffect(
    () => {
      update()
    },
    []
  )

  return (

    <Dialog open={absence} onClose={handleclose}>
      <DialogTitle>gerer les absence de ce professeur</DialogTitle>
      <DialogContent>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>jour</TableCell>
              <TableCell>période</TableCell>
              <TableCell>classe</TableCell>
            </TableRow>
          </TableHead>
          {
            absences.map(absence => {

              <TableRow>

                <TableCell>{absence.datea}</TableCell>
                <TableCell>temps</TableCell>
                <TableCell>{absence.classe}</TableCell>
              </TableRow>
            })
          }
        </Table>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleclose}>fermer</Button>
        <Button onClick={() => { setaddabsence(true) }}>ajouter</Button>
      </DialogActions>
      <Dialog open={addabsence} onClose={handlecloseadd}>
        <DialogTitle>ajouter une absence</DialogTitle>
        <DialogContent>
          <Classeselect notation={notation} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                width: "100%",
                marginTop: 5
              }}
            />
          </LocalizationProvider>


          <TextField
            id="outlined-multiline-flexible"
            label="mombre de période d'absence"
            multiline
            fullWidth
            Rows={4}
            type={"number"}
            sx={{
              marginTop: 5
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="motif du retard"
            value={motif}
            multiline
            fullWidth
            sx={{
              marginTop: 5
            }}
            Rows={4}
            onChange={(e) => { setmotif(e.target.value) }}
            InputLabelProps={{
              shrink: true,
            }}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handlecloseadd}>annuler</Button>
          <Button onClick={add}>ajouter</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}


function Discipline(props) {

  const { notation, setvalue } = props
  const [retard, setretard] = React.useState(false)
  const [absence, setabsence] = React.useState(false)

  const handleclose = () => {

    setabsence(false)
    setretard(false)

  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <Absence absence={absence} notation={notation} handleclose={handleclose} />
      <Retard retard={retard} notation={notation} handleclose={handleclose} />

      <Button variant="contained" onClick={() => { setretard(true) }}>retard</Button>
      <Button variant="contained" onClick={() => { setabsence(true) }}>absence</Button>



      <TextField
        id="standard-number"
        label="manque d'émargement "
        type="number"
        defaultValue={notation.em}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => { setvalue(e.target.value, "em") }} />



      <FormGroup style={{
        width: "100%"
      }}>
        <FormControlLabel control={<Checkbox checked={notation.pc} onChange={(e) => { setvalue(e.target.checked, "pc") }} />} label="présence aux heure de chapelles" />
        <FormControlLabel control={<Checkbox checked={notation.pr} />} label="présence à la recollection" onChange={(e) => { setvalue(e.target.checked, "pr") }} />
        <FormControlLabel control={<Checkbox checked={notation.ps} />} label="présence au séminaire" onChange={(e) => { setvalue(e.target.checked, "ps") }} />
        <FormControlLabel control={<Checkbox checked={notation.pag} />} label="présence à L'AG" onChange={(e) => { setvalue(e.target.checked, "pag") }} />
      </FormGroup>


      <TextField
        id="standard-number"
        label="absence au conseil d'enseignement"

        type="number"
        value={notation.ace}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => { setvalue(e.target.value, "ace") }} />


      <TextField
        id="standard-number"
        label="absence au conseil de classe"
        type="number"
        value={notation.acc}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => { setvalue(e.target.value, "acc") }}
      />




      <FormGroup style={{ width: "100%" }}>
        <FormControlLabel control={<Checkbox checked={notation.ra} onChange={(e) => { setvalue(e.target.checked, "ra") }} />} label="respect de l'autorité"
        />
        <FormControlLabel control={<Checkbox checked={notation.ei} onChange={(e) => { setvalue(e.target.checked, "ei") }} />} label="esprit d'initiative " />
        <FormControlLabel control={<Checkbox checked={notation.re} onChange={(e) => { setvalue(e.target.checked, "re") }} />} label="rapport avec les élève" />
        <FormControlLabel control={<Checkbox checked={notation.car} onChange={(e) => { setvalue(e.target.checked, "car") }} />} label="capacité a accepter les remarques" />
        <FormControlLabel control={<Checkbox checked={notation.tv} onChange={(e) => { setvalue(e.target.checked, "tv") }} />} label="Tenue vestimentaire" />
      </FormGroup>

      <TextField
        id="standard-number"
        label="rappel a l'ordre et observation"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => { setvalue(e.target.value, "r") }}
        value={notation.r}
      />
    </Box>
  )
}
export default function NotationTabs(props) {
  const [value, setValue] = React.useState(0);
  const [loading, setloading] = React.useState(true);
  const { trimestre, setvalue, notation } = props




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const startnotation = () => {
    run(`insert into notation (teacher_id,trim) values ("${window.selected.matricule}","${trimestre.id}")`).then((result) => {
      window.location.reload()
    })

  }
  return (
    (notation.id ? (
      <Box sx={{ maxWidth: '100%', height: '100%', overflow: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', m: 2 }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Discipline" {...a11yProps(0)} />
            <Tab label="Aptitudes pédagogique" {...a11yProps(1)} />
            <Tab label="Coordination des conseils" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Discipline notation={notation} setvalue={setvalue} />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <Aptitudes notation={notation} setvalue={setvalue} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Autres notation={notation} setvalue={setvalue} />
        </TabPanel>

      </Box>) :
      (
        <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {!loading ? (
            <div>
              <h1 style={{ color: "#222" }}>
                ce professeur n'a pas été noté ce trimestre
              </h1>
              <Button onClick={startnotation} variant="contained">Debuter une notation</Button>
            </div>) :
            (<CircularProgress />)}
        </div>
      )
    )

  );
}