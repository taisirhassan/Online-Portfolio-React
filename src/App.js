import "./styles/main.scss";
import "./App.css";
import Navbar from "./components/navbar";
import Projects from "./components/projects";
import Namecontainer from "./components/name-container";
import Technologies from "./components/technologies";
import DarkMode from "./components/DarkMode";
import Footer from "./components/footer";
function App() {
  return (
    <div>
      <Navbar />
      <Namecontainer />
      <DarkMode />
      <Technologies />
      <Projects />
    </div>
  );
}
export default App;
