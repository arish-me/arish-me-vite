import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useTheme } from "@/context/ThemeContext";

const Layout = () => {
  const { theme } = useTheme(); // Get the current theme
  // Define a mapping between themes and gradients
  const themeGradients: Record<string, string> = {
    default: "bg-gradient-to-r from-gray-900 to-gray-700",
    dark: "bg-gradient-to-r from-gray-900 to-gray-700",
    light: "bg-gradient-to-r from-rose-100 to-teal-100",
  };

  const currentGradient = themeGradients[theme] || themeGradients["light"];

  return (
    <div className={`${currentGradient} min-h-screen`}>
    <main className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <Header />
      <Outlet />
      <Footer/>
    </main>
    </div>
  );
};

export default Layout;
