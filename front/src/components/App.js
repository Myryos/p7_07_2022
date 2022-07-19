import logo from '../assets/svg/icon-left-font.svg';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import{Link} from 'react-router-dom'
import '../App.css'

function App() {
  return (
    <ThemeProvider breakpoints={['xxl','xl','lg','md','sm']}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
           Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          Learn React
          </a>
          <nav
          style={{
          borderBottom: "solid 1px red",
          paddingBottom: "1rem"} 
          }>
          <Link to="/login">TEST</Link>
          <Link to="/signup">TEST 2</Link>
          </nav>
        </header>
        <main>

        </main>
        <footer>

        </footer>
      </div> 
    </ThemeProvider>
  );
}

export default App;
