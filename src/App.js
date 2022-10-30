import './App.css';
import {Route, Routes} from 'react-router-dom';
import Restaurants from './components/Restaurants';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Restaurants />} />
      </Routes>
    </div>
  );
}

export default App;
