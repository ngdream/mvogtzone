import InformationTabs from "../../components/information/informationtabs"
import './edition.css'
import { Link, redirect, useLocation, useParams } from "react-router-dom";
import { Add, Print, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getallquarters, get, run, getprofs, PrintNotation } from '../../renderer'
import { CircularProgress } from "@mui/material";



const Notation = () => {
  const [quarters, Setquarters] = useState([])
  console.log(window.trimestre)
  const [trimestre, Settrimestre] = useState({ lib: undefined, id: undefined })
  const [onadd, setonadd] = useState(false)


  const actualize = () => {
    get("Select * from trimestre").then((result) => {


      var newquarters = []

      result.forEach(r => {

        let lib = `trimestre ${r.lib[0]} ` + r.lib.substring(1)

        newquarters.push({ id: r.id, text: lib, lib: r.lib })

      });

      Setquarters(newquarters)
      Settrimestre(window.trimestre)

    });
  }
  useEffect(() => {

    actualize()

  }, []);




  const add = async (numero) => {

    const getlibfromlast = (last) => {
      var lasttri = parseInt(last.lib[0])
      var lastyear = last.lib.substring(1)

      var newlib = ((lasttri % 3) + 1)
      var years = lastyear.split("-")

      var year = parseInt((lasttri == 3) ? years[1] : years[0])




      return `${newlib}${year}-${year + 1}`

    }
    const getlibfromnow = () => {
      var crtdate = new Date()
      var month = crtdate.getMonth()
      var year = crtdate.getFullYear()
      var tri
      var yr
      if (month >= 8 && month <= 11) {
        tri = 1
      }
      else if (month >= 0 && month <= 3) {
        tri = 2
      }
      else {
        tri = 3
      }

      if (tri == 1)
        yr = `${year}-${year - 1}`
      else
        yr = `${year - 1}-${year}`

      return tri + yr
    }

    var result = await get("SELECT * FROM trimestre  ORDER BY id DESC LIMIT 1;")


    var lib
    if (result.length == 0) {
      lib = getlibfromnow()

    }

    else {
      lib = getlibfromlast(result[0])

    }

    await run(`insert into trimestre (lib) values ("${lib}");`)

    const [trimestre] = await get("SELECT * FROM trimestre  ORDER BY id DESC LIMIT 1;")
    actualize()
    const profs = await getprofs()
    for (var prof in profs) {
      run(`insert into notation (teacher_id,trim) values ("${profs[prof].matricule}","${trimestre.id}")`)

    }
    const [lasttrimestre] = await get("SELECT * FROM trimestre  ORDER BY id DESC LIMIT 1;")
    Settrimestre(lasttrimestre)


  }





  const remove = (lib) => {
    run(`DELETE FROM trimestre WHERE lib = "${lib}"`).then((result) => {
      actualize()
      Settrimestre({ lib: undefined, id: undefined })
      window.trimestre = { lib: undefined, id: undefined }

    });
  }

  const handleaddclick = () => {

    add(undefined)

  }

  const handleremoveclick = () => {
    remove(trimestre.lib)

  }

  return (



    <div style={{
      padding: 0
    }} className="container edition">
      {window.selected.matricule ? (
        <InformationTabs trimestre={trimestre} />
      ) :
        (<div style={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }} >
          <h1 style={{ color: "#222" }}> selectionner un professeur et modifier ces données ici</h1>
        </div>)}




      <div className="quartersidebar">


        <ul>

          {quarters.map(t => {

            return (<button onClick={() => { Settrimestre({ id: t.id, lib: t.lib }); window.trimestre = { id: t.id, lib: t.lib } }} className={(trimestre.lib == t.lib) ? " active" : ""}> <li>  {t.text} </li></button>)
          }
          )}
        </ul>


        <div className="tools">
          <button id="addbutton " onClick={handleaddclick} >
            <Add style={{ color: "#00ccff" }} />
          </button>
          {trimestre.lib && (
            <button id="rembutton" onClick={handleremoveclick}>
              <Remove style={{ color: "rgb(221, 0, 0)" }} />
            </button>)
          }
          {
            window.selected.matricule &&
            (
              <button onClick={PrintNotation}>
                <Print />
              </button>
            )
          }

        </div>

      </div>
      {
        onadd && (
          <div className="loader-wrapper">
            <CircularProgress />
          </div>
        )
      }
    </div >




  )




}



export default Notation