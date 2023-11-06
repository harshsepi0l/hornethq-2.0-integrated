import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout'
import Home from './pages/Home';
import Academics from './pages/Academics';
import Grades from './pages/Academics/Grades';
import CourseCatalog from './pages/Academics/CourseCatalog';
import StudentPlanning from './pages/Academics/StudentPlanning';
import FinInfo from './pages/FinInfo';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="academics" element={<Academics />} />
        <Route path="academics/grades" element={<Grades />} />
        <Route path="/academics/catalog" element={<CourseCatalog />} />
        <Route path="/academics/planning" element={<StudentPlanning />} />
        <Route path="financial" element={<FinInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;