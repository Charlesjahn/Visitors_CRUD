import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'

import Home from './components/pages/Home'
import AllVisit from './components/pages/AllVisit'
import Create from './components/pages/Create'

import Container from './components/layout/Container'

function App() {

  const [visitors, setVisitors] = useState([]);

  const addVisitor = (visitor) => {
    setVisitors([...visitors, visitor]);
  };

  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Container>
          <Routes>

            <Route path="/my-web-page" element={<Home />} />

            <Route path="/create" element={<Create onAddVisitor={addVisitor} />} />

            <Route path="/allvisitors" element={<AllVisit visitors={visitors} />} />

          </Routes>
        </Container>

        <Footer />

      </Router>
    </React.Fragment>
  );
}

export default App;
