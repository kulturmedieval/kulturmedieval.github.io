import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Eventos from './components/Eventos';

function App() {
  return (
   <div class="App">
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />}/>
        </Routes>
  </BrowserRouter>
  </div>
   

    
  );
}

export default App;
