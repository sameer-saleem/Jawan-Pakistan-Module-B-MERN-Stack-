import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import SignIn from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/signup/Signup';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      { currentPath !== "/" && currentPath !== "/sign-in" && <Header /> }

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />

      </Routes>

      { currentPath !== "/" && currentPath !== "/sign-in" && <Footer /> }
    </>
  );
}

export default App;
