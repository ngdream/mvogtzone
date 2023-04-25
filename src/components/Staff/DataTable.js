



import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getprofs, run, handleerror } from '../../renderer';

function createData(matricule, nom, email, matiere) {
  return {
    matricule,
    nom,
    email,
    matiere,

  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'matricule',
    numeric: false,
    disablePadding: true,
    label: 'matricule',
  },
  {
    id: 'nom',
    numeric: false,
    disablePadding: false,
    label: 'nom',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'email',
  },
  {
    id: 'matiere',
    numeric: false,
    disablePadding: false,
    label: 'matiere',
  },
];
var i = 0
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


function EnhancedTableToolbar(props) {
  const { numSelected, addprof, deleteprof, selected } = props;
  const [open, setOpen] = React.useState(false);
  const [matricule, setmatricule] = React.useState('');
  const [email, setemail] = React.useState('');
  const [name, setname] = React.useState('')
  const [matiere, setmatiere] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleadd = () => {

    addprof(matricule, name, email, matiere)


    setOpen(false);
  };

  const handleclickremove = () => {
    deleteprof(selected)

  };
  const handleClose = () => {
    setOpen(false);

  };


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.matricule != '' && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selected.matricule != '' ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.name}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Professeurs
        </Typography>

      )}

      {selected.matricule != '' && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={handleclickremove} />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="ajouter un nouveau professeur">
        <IconButton onClick={handleClickOpen}>
          <Add />
        </IconButton>
      </Tooltip>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ajouter un nouveau professeur</DialogTitle>
        <DialogContent>



          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="Matricule"
            type="text"
            fullWidth
            variant="standard"

            value={matricule}
            onChange={(event) => { setmatricule(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="nom"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => { setname(event.target.value) }}
          />



          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(event) => { setemail(event.target.value) }}
          />



          <FormControl fullWidth variant="standard" >
            <InputLabel id="matiere-label-id">matiere</InputLabel>
            <Select
              labelId="matiere-label-id"
              autoFocus
              margin="dense"
              id="matiere"
              label="matiere"
              type="text"


              value={matiere}
              onChange={(event) => { setmatiere(event.target.value) }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"math"}>mathematique</MenuItem>
              <MenuItem value={"PCT"}>pct</MenuItem>
              <MenuItem value={"GEO"}>Géographie</MenuItem>
              <MenuItem value={"francais"}>francais</MenuItem>
              <MenuItem value={"phylo"}>philosophie</MenuItem>
              <MenuItem value={"anglais"}>anglais</MenuItem>
              <MenuItem value={"info"}>informatique</MenuItem>
              <MenuItem value={"SVT"}>SVT</MenuItem>
              <MenuItem value={"latin"}>latin</MenuItem>
              <MenuItem value={"chinois"}>chinois</MenuItem>


            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleadd}>ajouter</Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function Datatable() {

  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState(window.selected);

  const handleRequestSort = (event, property) => {


    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const actualize = () => {
    getprofs().then((result) => {

      console.log(result)
      var newrows = []

      result.forEach(r => {
        newrows.push(createData(r.matricule, r.nom, r.email, r.matiere))
      });

      setRows(newrows)

    });
  }

  React.useEffect(() => {
    actualize()

  }, []);

  const add = (matricule, name, email, matiere) => {
    run(`insert into professeur (matricule,nom,email,matiere) values ("${matricule}","${name}","${email}","${matiere}");`).then((result) => {
      actualize()
    });

  }


  const remove = (item) => {
    run(`DELETE FROM professeur WHERE matricule = "${item.matricule}"`).then((result) => {
      setSelected({ matricule: "", name: "" })
      window.selected = { matricule: "", name: "" }
      actualize()
    });
  }


  const handleClick = (event, item) => {

    let newSelected = item;
    window.selected = item
    setSelected(newSelected);
  };


  const isSelected = (matricule) => selected.matricule == matricule;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={0} addprof={add} deleteprof={remove} selected={selected} />
        <TableContainer sx={{ overflow: 'auto', height: 500 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={0}
              order={order}
              orderBy={orderBy}

              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.matricule);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, { matricule: row.matricule, name: row.nom, matiere: row.matiere })}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.matricule}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.matricule}
                      </TableCell>
                      <TableCell align="right">{row.nom}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.matiere}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
}



export default Datatable;