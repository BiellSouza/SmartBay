import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import InterfaceLogin from "./pages/InterfaceLogin";
import HistoryItens from "./pages/HistoryItens";
import ListItens from "./pages/MyList";
import PersonalData from "./pages/SubPages/PersonalData";
import Theme from "./pages/SubPages/Theme";
import Support from "./pages/SubPages/Support";
import Privacy from "./pages/SubPages/Privacy";

function App() {
  return (
    <div className="min-h-screen max-w-100 mx-auto lg:m-0 lg:max-w-full overflow-hidden border border-gray-300 my-2 lg:border-none">
      <main>
        <div className="p-6 lg:p-0">
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
