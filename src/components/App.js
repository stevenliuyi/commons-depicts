import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TopNavBar from './TopNavBar'
import ImageGallery from './ImageGallery'
import Home from './Home'

class App extends Component {

  render() {
    return (
      <div className="site">
        <div className="site-content">
            <Router basename={process.env.PUBLIC_URL}>
              <div>
                <Route path="/" component={TopNavBar} />
               <Switch>
                <Route exact path="/:qid([qQ]\d+)" component={ImageGallery} />
                <Route path="/" component={Home} />
               </Switch>
        </div>
           </Router>
        </div>
        <footer className="footer">
          Steven Liu&nbsp;&nbsp;2019
        </footer>
      </div>
    )
  }
}

export default App
