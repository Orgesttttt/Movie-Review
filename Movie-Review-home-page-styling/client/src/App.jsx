import {BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieList from './pages/MovieList.jsx';
import Favourites from './pages/Favourites.jsx';

import './App.css';
function App() {
    
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/favourites" element={<Favourites />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;