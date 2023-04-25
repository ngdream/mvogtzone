import { Class, Drafts, Inbox } from "@mui/icons-material"
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Table, TableCell, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { get, run } from "../../renderer"


function Classes(props) {

  const { classes, handleclose, notation } = props
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [addclasse, setaddclasse] = React.useState(false);
  const [classelist, setclasses] = React.useState([])
  const [programs, setprograms] = React.useState([])

  const [classe, setclasse] = React.useState("")

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  }

  function handlecloseadd() {
    setaddclasse(false)
  }

  const actualize = async () => {
    const classes = await get("select * from classe")
    const programs = await get(`select  classname from programs where notationid =${notation.id} `)
    setprograms(programs)
    setclasses(classes)
  }

  useEffect(
    () => {
      actualize()
    },
    []
  )

  function add(name) {
    run(`insert into programs (notationid,classname) values (${notation.id},"${name}")`)
    actualize()
    handlecloseadd()
  }

  return (
    <Dialog open={classes} onClose={handleclose}>
      <DialogTitle>gerer les classes de cet enseignant</DialogTitle>
      <DialogContent>
        <List component="nav" aria-label="main mailbox folders">

          {
            programs.map(t => {
              return (
                <ListItemButton
                  selected={selectedIndex === t.classname}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemText primary={t.classname} />
                </ListItemButton>)
            })}
        </List>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleclose}>Cancel</Button>
        <Button onClick={() => { setaddclasse(true) }}>ajouter</Button>
      </DialogActions>

      <Dialog open={addclasse} onClose={handlecloseadd}>
        <DialogTitle>ajouter une absence</DialogTitle>
        <DialogContent>

          <Select
            onChange={(e) => { setclasse(e.target.value) }}
            displayEmpty
            inputProps={{ 'aria-label': 'classe' }}
            fullWidth
            value={classe}
          >
            <MenuItem value="" >

              <em></em>
            </MenuItem>

            {
              classelist.map(t => {
                return (<MenuItem value={t.nom}>{t.nom}</MenuItem>)

              })
            }

          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handlecloseadd}>annuler</Button>
          <Button onClick={() => { add(classe) }}>ajouter</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}




export default function TimeTable(props) {
  const { setvalue, notation } = props

  const [classes, setclasses] = React.useState(false)

  const handleclose = () => {
    setclasses(false)
  };

  console.log(notation.observation)

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        p: 3
      }}
      noValidate
      autoComplete="off"
    >
      <Classes classes={classes} notation={notation} handleclose={handleclose} />
      <FormGroup sx={{ m: 1 }}>
        <FormControlLabel control={<Checkbox onChange={(e) => { setvalue(e.target.checked, "qc") }} checked={notation.qc} />} label="cochez cette case si ce professeur est titulaire d'une classe" />
      </FormGroup>
      <Button variant="contained" onClick={() => { setclasses(true) }} sx={{ m: 1 }}
      >Classes Tenues</Button>

      <div>
        <TextField
          id="observation"
          label="observation"
          multiline
          Rows={4}
          onChange={(e) => { setvalue(e.target.value, "observation") }}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={notation.observation}
          sx={{ width: "500px" }}


        />
      </div>



    </Box>

  );
}

