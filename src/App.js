import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Start from './start';
import Register from './Register';
import Student from './student';
import University from './University';
function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Start/></>}></Route>
         <Route path="/student" element={<><Login user={"student"} /></>}>
        </Route>
        <Route path="/university" element={<><Login user="university"/></>}>
        </Route>
        <Route path="/register" element={<><Register/></>}>
        </Route>
        <Route path="/studentdata" element={<><Student/></>}>
        </Route>
        <Route path="/universitydata" element={<University/>}>
        </Route>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
