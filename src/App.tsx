import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tracking from './pages/Tracking';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracking/:code" element={<Tracking />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;