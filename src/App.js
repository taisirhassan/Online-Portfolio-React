import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./styles/main.scss";
import "./App.css";
import Navbar from "./components/navbar";
import Projects from "./components/projects";
import Namecontainer from "./components/name-container";
import Technologies from "./components/technologies";
import Footer from "./components/footer";
function App() {
  return (
    <div>
      <Navbar />
      <Namecontainer />
      <Technologies />
      <Projects />
      <Footer />
    </div>
  );
}
export default App;
