import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import SignIn from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/signup/Signup';

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
