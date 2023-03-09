import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField } from "@mui/material"
import React from "react"
import { get } from "../../renderer"



export default function TimeTable(props) {
  const {trimestre}=props
  const [loading, setloading] = React.useState(true)
  const {setvalue,notation}=props

  



  

    return (
      <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
      p:3
    }}
    noValidate
    autoComplete="off"
  >
        <FormGroup>
        <FormControlLabel control={<Checkbox  onChange={(e)=>{setvalue(e.target.checked,"qc")}} checked={notation.qc}/>} label="cochez cette case si ce professeur est titulaire d'une classe" />
        </FormGroup>
        <Button variant="contained"             sx={{ m: 0, marginTop:3}}
 >Classes Tenues</Button>


        <TextField
            id="outlined-multiline-flexible"
            label="observation"
            multiline
            Rows={4}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ m: 0, marginTop:10}}

        />

  


       
        

        </Box>
  
    );
  }

