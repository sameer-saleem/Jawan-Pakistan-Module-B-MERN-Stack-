import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import SignIn from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/signup/Signup';
import { useLocation } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Students from './components/students/Students';

function App() {

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      { currentPath !== "/" && currentPath !== "/sign-in" && <Sidebar /> }
      { currentPath !== "/" && currentPath !== "/sign-in" && <Header /> }

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />

      </Routes>

      { currentPath !== "/" && currentPath !== "/sign-in" && <Footer /> }
    </>
  );
}

export default App;
