import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import PersonalData from "./pages/SubPages/PersonalData";
import InterfaceLogin from "./pages/InterfaceLogin";
import HistoryItens from "./pages/HistoryItens";
import ListItens from "./pages/MyList";
import Privacy from "./pages/SubPages/Privacy";
import Support from "./pages/SubPages/Support";
import Theme from "./pages/SubPages/Theme";

function App() {
  return (
    <div className="min-h-screen max-w-100 mx-auto">
      <main>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<InterfaceLogin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<HistoryItens />} />
            <Route path="/myList" element={<ListItens />} />

            {/* SubRotas */}
            <Route path="/personaldata" element={<PersonalData />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/support" element={<Support />} />
            <Route path="/theme" element={<Theme />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
