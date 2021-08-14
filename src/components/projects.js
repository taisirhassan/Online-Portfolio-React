import { Carousel } from "react-responsive-carousel";

function Projects() {
  return (
    <div class="title">
      <h2>Projects</h2>

      <Carousel class="projects-container" id="projects-container">
        <div class="project">
          <h3>6502 16-bit computer system </h3>
          <ul class="project-description">
            <li>
              Spearheaded the development of a 16-bit breadboard computer system
              using the 6502-assembly language for the purpose of flashing LED
              lights in a binary fashion
            </li>
            <li>
              Assembled multiple core parts of the computer such as the CPU,
              RAM, and ROM chips atop the breadboard.
            </li>
          </ul>
        </div>
        <div class="project">
          <h3>Firefighting Robot</h3>
          <ul class="project-description">
            <li>
              Headed the development of a robot that was able to navigate
              successfully when faced with objects{" "}
            </li>
            <li>
              Engineered sensors for the detection of heat or flames and
              incorporated a fire extinguishing system.
            </li>
            <li>
              Implemented a solid navigation system purposed to navigate complex
              mazes and hurdles
            </li>
          </ul>
        </div>
        <div class="project">
          <h3>Multiplexing Scoreboard Project </h3>
          <ul class="project-description">
            <li>
              Planned and executed the development of a digital scoreboard
              utilizing C and 7-segment displays that would go up in intervals
              whenever a point was allotted
            </li>
          </ul>
        </div>
      </Carousel>
    </div>
  );
}
export default Projects;
