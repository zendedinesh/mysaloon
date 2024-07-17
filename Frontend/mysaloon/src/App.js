import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddCategary from "./Pages/AddCategory/AddCategory";
import AddServices from "./Pages/ViewServiceCategory/AddServices";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddCategary />} />
          <Route path='/AddCategory' element={<AddCategary />} />
          <Route path='/ViewServiceCategory' element={<AddServices />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
