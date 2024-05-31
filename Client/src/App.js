import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Classes from './components/Classes';
import studentListByclassId from './components/studentListByclassId';
import createClass from './components/createClass';
import createStudent from './components/createStudent';
import About from './components/About'
import Footer from './components/footer';



function App() {
  return (
    <BrowserRouter>
      <div className='App' style={{ fontFamily: 'Exo-2', background: 'linear-gradient(#2196f3, #64b5f6)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header className="App">
          <Navbar />
          <Route exact path='/' component={Classes} />
          <Route exact path='/createClass' component={createClass} />
          <Route exact path='/createStudent' component={createStudent} />
          <Route exact path='/about' component={About} />
          <Route exact path='/class/:class_id' component={studentListByclassId} />
        </header>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
