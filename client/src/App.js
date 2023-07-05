
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { useEffect, useState } from 'react';
// import { ErrorPage } from './components/ErrorPage';
import { SpecificSubject } from './components/SpecificSubject';
import { AddStudent } from './components/AddStudent';
import { UserProfile } from './components/UserProfile';
import { EditDelete } from './components/EditDelete';
import { TeacherUser } from './components/TeacherUser';
import { EditTeacher } from './components/EditTeacher';

function App() {

  const [isLogin, SetisLogin] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.href.indexOf('/login') === -1) {
      window.location.href = '/login'
      SetisLogin(false)
    } else {
      SetisLogin(true)
    }
  }, [isLogin])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {isLogin && (
          <>
            <Route path='/home/:id' element={<Home />} />
            <Route path='/subject/:id' element={<SpecificSubject />} />
            <Route path='/addStudent/:id' element={<AddStudent />} />
            <Route path='/userProfile/:id' element={<UserProfile />} />
            <Route path='/edit/:id' element={<EditDelete />} />
            <Route path='/teacherProfile/:id' element={<TeacherUser />} />
            <Route path='/teacherEdit/:id' element={<EditTeacher />} />
          </>

        )}
        {/* <Route path='*' element={<ErrorPage/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
