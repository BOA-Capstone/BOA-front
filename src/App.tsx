import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import ChargeResultPage from './pages/ChargeResultPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/charge-result" element={<ChargeResultPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;