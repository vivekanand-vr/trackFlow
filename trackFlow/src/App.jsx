import React, { useState, useContext } from 'react';
import { UserContext } from './context/userContext';
import SignIn from './components/SignIn';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  if (user) {
    return (<body className='bg-black'>
              <Dashboard />
            </body>
          );
  }

  return (
    <>
      <LandingPage onClick={toggleModal} />
      <SignIn isOpen={showModal} toggleModal={toggleModal} />
    </>
  );
}

export default App;