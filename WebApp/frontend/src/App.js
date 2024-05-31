import { ColorModeContext, useMode } from "./constants/theme";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import GuestUser from "./components/GuestUser";
import LoggedUser from "./components/LoggedUser";
import Homepage from "./scenes/global/Homepage";
import RegisterPage from "./scenes/global/RegisterPage";
import KioskLogin from "./scenes/dashboard/Kiosk/KioskLogin";
import KioskRegister from "./scenes/dashboard/Kiosk/KioskRegister";
import AdminRegister from "./scenes/dashboard/Admin/AdminRegister";
import CarRegister from "./scenes/dashboard/CarOwner/CarRegister";
import LotRegister from "./scenes/dashboard/LotOwner/LotRegister";
import LoginPage from "./scenes/global/LoginPage";
import NotFound from "./scenes/global/NotFound";
import CarDashboard from "./scenes/dashboard/CarOwner/CarDashboard";
import LotDashboard from "./scenes/dashboard/LotOwner/LotDashboard";
import LotAdd from "./scenes/dashboard/LotOwner/LotAdd";
import AdminDashboard from "./scenes/dashboard/Admin/AdminDashboard";
import KioskDashboard from "./scenes/dashboard/Kiosk/KioskDashboard";
import Footer from "./components/Footer";

function App() {
  const [theme, { toggleColorMode }] = useMode();
  const token = localStorage.getItem("token");
  let user;

  if (token) {
    const [payload] = token.split(".").slice(1, 2);
    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    user = decodedPayload.role;
  }

  useEffect(() => {
    const storedColorMode = sessionStorage.getItem("colorMode");
    if (!storedColorMode) {
      toggleColorMode();
    }
  }, [toggleColorMode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
          {user ? <LoggedUser /> : <GuestUser />}
          {!user ? (
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/kiosk/login" element={<KioskLogin />} />
              <Route path="/kiosk/register" element={<KioskRegister />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/car/register" element={<CarRegister />} />
              <Route path="/lot/register" element={<LotRegister />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "CAROWNER" ? (
            <Routes>
              <Route path="/car/dashboard" element={<CarDashboard />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "LOTOWNER" ? (
            <Routes>
              <Route path="/lot/dashboard" element={<LotDashboard />} />
              <Route path="/lot/add" element={<LotAdd />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "ADMIN" ? (
            <Routes>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "KIOSK" ? (
            <Routes>
              <Route path="/kiosk/dashboard" element={<KioskDashboard />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : (
            <Homepage />
          )}
          <Footer />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
