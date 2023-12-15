import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBorard from "./pages/DashBorard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import AccessLogin from "./component/AccessLogin";
import AccessLogout from "./component/AccessLogout";

function App() {
  return (
    <div>
      <Toaster/>
          <Router>
            <Routes>
              <Route 
              exact path="/"
              element={(
                <>
                <AccessLogin/>
                <DashBorard />
                </>
              )
              }>
              </Route>
              <Route 
                exact path="/register" 
                element={(
                  <>
                  <AccessLogout/>
                  <Register />
                  </>
                )}>
              </Route>
              <Route 
                exact path="/login"
                element={(
                  <>
                  <AccessLogout/>
                  <Login />
                  </>
                )}>
              </Route>
            </Routes>
          </Router>
          
    </div>
  );
}

export default App;
