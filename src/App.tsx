import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import PersonalData from "./pages/SubPages/PersonalData";
import InterfaceLogin from "./pages/InterfaceLogin";
import HistoryItens from "./pages/HistoryItens";
import ListItens from "./pages/MyList";

function App() {
  return (
    <div className="min-h-screen max-w-100">
      <main>
        <div className="p-6">
          {/* <NavbarComponent /> */}

          {/* <footer className="fixed bottom-0 left-0 z-50 w-full bg-white px-12 py-2 border-t border-gray-200">
            {" "}
            <div className="flex justify-between mt-2">
              {" "}
              {itensRodape.map((item) => (
                <div className="flex flex-col items-center gap-1">
                  <span>{item.item}</span>
                  <p className="text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </footer> */}
          <Routes>
            <Route path="/" element={<InterfaceLogin />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/personaldata" element={<PersonalData />} />
            <Route path="/history" element={<HistoryItens />} />
            <Route path="/myList" element={<ListItens />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
