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




  const add = (numero) => {

    setonadd(true)

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

    get("SELECT * FROM trimestre  ORDER BY id DESC LIMIT 1;").then((result) => {





      var lib
      if (result.length == 0) {
        lib = getlibfromnow()

      }

      else {
        lib = getlibfromlast(result[0])

      }

      run(`insert into trimestre (lib) values ("${lib}");`).then((result) => {

        get("SELECT * FROM trimestre  ORDER BY id DESC LIMIT 1;").then((result) => {
          var newtrimestre = result[0]
          actualize()
          getprofs().then((result) => {
            console.log(result)
            var profs = result
            for (var prof in result) {
              run(`insert into notation (teacher_id,trim) values ("${result[prof].matricule}","${newtrimestre.id}")`)


              var periodes = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8",
                "m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "me1",
                "me2", "me3", "me4", "me5", "me6", "me7", "me8",
                "j1", "j2", "j3", "j4", "j5", "j6", "j7", "j8",
                "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8",
                "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"]

              var tn = 0

              for (var p of periodes) {
                run(`insert into tranche (teacher_id,trim,periode) values ("${result[prof].matricule}","${newtrimestre.id}","${p}")`).then((result) => {
                  tn++
                  if (tn == 48 && prof == profs.length - 1)
                    setonadd(false)

                })

              }
            }
          })
        });
      })


    })


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