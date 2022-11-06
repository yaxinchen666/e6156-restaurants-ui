import './App.css';
import {Route, Routes} from 'react-router-dom';
import Restaurants from './components/Restaurants';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Restaurants />} />
      </Routes>
    </div>
  );
}

export default App;
