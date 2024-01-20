// import logo from './logo.svg';
import logo from './img/ZyptFace_112.png'
import twitch_logo from './img/twitch-logo.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
          <p>
            It's me! ZyptFFF
            <br/>
            Live streaming at:
            <br/>
            <img className='twitch_logo' src={twitch_logo} alt="twitch_logo" />
            &nbsp;
              <a
              className="App-link"
              href="https://twitch.tv/zyptfff"
              // target="_blank"
              // rel="noopener noreferrer"
              >
              Twitch
              </a>
          </p>
      </header>
    </div>
  );
}

export default App;
