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
            <Route path="/history" element={<HistoryItens />} />
            <Route path="/myList" element={<ListItens />} />
            <Route path="/profile" element={<Profile />} />

            {/* SubRotas */}
            <Route path="/personalData" element={<PersonalData />} />
            <Route path="/theme" element={<Theme />} />
            <Route path="/support" element={<Support />} />

            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
