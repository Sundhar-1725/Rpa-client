import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/index/Index";
import 'bootstrap/dist/css/bootstrap.min.css'
import Experity from "./pages/rpa/Experity/Experity";
import ExperityLogger from "./pages/rpa/Experity/ExperityLogger";
import Register from "./pages/register/Register";
import { Provider } from "react-redux";
import  store  from './store/store'
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import SecretKey from "./pages/secretkey/SecretKey";
import ForgotSecretKey from "./pages/secretkey/ForgotSecretKey";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/secretkey" element={<SecretKey/>}/>
          <Route path="/forgotsecretkey" element={<ForgotSecretKey/>}/>
          <Route path="/index" element={<Index />} />
          <Route path="/experity" element={<Experity />} />
          <Route path="/experity-logger" element={<ExperityLogger />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
export default App;