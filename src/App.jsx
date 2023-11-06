import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout'
import Home from './pages/Home';
import Academics from './pages/Academics';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="academics" element={<Academics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;