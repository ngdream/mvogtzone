import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TimerTwoTone, Note, ArticleOutlined } from '@mui/icons-material';
import NotationTabs from './notationtabs';
import TimeTable from './TimeTable';
import { get, run } from '../../renderer';
import { Button } from '@mui/material';






function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 0, height: "100%" }}>
          {children}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function InformationTabs(props) {
  const [value, setValue] = React.useState(0);
  const { trimestre } = props

  const [loading, setloading] = React.useState(true)
  const [notation, setnotation] = React.useState(new Object())
  const actualize = async () => {

    var notations = await get(`select * from notation where  teacher_id="${window.selected.matricule}" and trim="${trimestre.id}"`)

    if (notations.length != 0) {
      if (notation.id != notations[0].id)
        setnotation(notations[0])


    }
    else if (notation.id) {
      setnotation({ id: undefined })
    }
    setloading(false)
  }


  actualize()


  const setvalue = async (value, field) => {
    if (value === true)
      value = 1
    else if (value === false)
      value = 0


    if (typeof value === 'number' || typeof value === 'boolean') {
      await run(`UPDATE notation SET ${field} = ${value} WHERE teacher_id="${window.selected.matricule}" and trim=${window.trimestre.id} ;`)
    }
    else {
      await run(`UPDATE notation SET ${field} = "${value}" WHERE teacher_id="${window.selected.matricule}" and trim=${window.trimestre.id} ;`)

    }
    var notations = await get(`select * from notation where  teacher_id="${window.selected.matricule}" and trim="${trimestre.id}" `)
    if (notations.length != 0) {

      setnotation(notations[0])


    }
    else if (notation.id) {
      setnotation({ id: undefined })
    }
    setloading(false)
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const startnotation = () => {
    run(`insert into notation (teacher_id,trim) values ("${window.selected.matricule}","${trimestre.id}")`).then((notations) => {
      console.log(notations)
      setnotation({ id: undefined })
    })

  }

  return (

    trimestre.lib ? (
      notation.id ? (
        <Box
          sx={{ bgcolor: 'background.paper', display: 'flex', height: '100%', width: '100%' }}
        >
          <Tabs

            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab icon={< ArticleOutlined sx={{ fontSize: "40px" }} />} {...a11yProps(1)} />
            <Tab icon={< TimerTwoTone sx={{ fontSize: "40px" }} />} {...a11yProps(0)} />

          </Tabs>
          <TabPanel sx={{ width: '100%' }} value={value} index={0}>
            <NotationTabs trimestre={trimestre} notation={notation} setvalue={setvalue} />
          </TabPanel>
          <TabPanel sx={{ width: '100%' }} value={value} index={1}>
            <TimeTable trimestre={trimestre} notation={notation} setvalue={setvalue} />
          </TabPanel>


        </Box>)
        :
        (
          <div className='alt'>
            <h1 style={{ color: "#222" }}>
              ce professeur n'a pas été noté ce trimestre
            </h1>
            <Button onClick={startnotation} variant="contained">Debuter une notation</Button>
          </div>
        )
    ) :
      (
        <div className='alt'><h1 style={{ color: "#222" }}>sélectionner un trimestre</h1></div>

      )


  );
}