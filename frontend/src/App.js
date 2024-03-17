import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import SignUp from './Components/SignUp';
import VerificationPage from './Components/VerificationPage';
import Login from './Components/Login';
import Home from './Components/Home';
import Profile from './Components/Profile';
import { Provider } from 'react-redux';
import store from './utlis/store';
function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        {/* Your common components can go here */}
        <Header />
        {/* Use Routes to define your routes */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify/:userId" element={<VerificationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}  />
          <Route path="/profile" element={<Profile/>}/>
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
