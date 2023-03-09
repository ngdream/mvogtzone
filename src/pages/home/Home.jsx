import './home.css'

import Widget from '../../components/widgets/widget'

const Home = () => {
    return (
      <div className="container home" style={{}}>
          <div className="widgets">
        <Widget type="user"/>
        <Widget type="earning"/>
        <Widget type="balance"/>
      </div>
      </div>
    )
  }
  
  export default Home