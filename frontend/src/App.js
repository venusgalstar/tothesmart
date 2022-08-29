import Main from "./pages/Main";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './asset/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
        </Route>
      </Routes>
    </Router>
  );
}



export default App;