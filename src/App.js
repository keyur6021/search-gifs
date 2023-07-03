import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeGif from './components/HomeGif';
import { Suspense } from 'react';


function App() {
  return (
    <div className="App">
      <Router>
        {/* when component load */}
        <Suspense fallback={<> This is Lodding... </>}>
          <Routes>
            <Route exact path='/' element={<HomeGif />} />
          </Routes>
        </Suspense>
      </Router>

    </div>
  );
}

export default App;
