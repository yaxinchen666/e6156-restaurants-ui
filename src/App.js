import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Restaurants from './components/Restaurants';

function App() {
  return (
    <div className="App">
      Hello world
      <Routes>
        <Route path="/" element={<Restaurants />} />
      </Routes>
    </div>
  );
}

export default App;
