import FadeIn from "react-fade-in/lib/FadeIn";

function Namecontainer() {
  return (
    <FadeIn>
      <div class="name-container" id="namer-container">
        <h3 class="name-header">
          My Name is <i>Taisir Hassan</i>
          <p>
            I am an Aspiring Computer Engineer currently a student at the
            University of Waterloo!
          </p>
        </h3>
        <div class="buttons">
          <a href="mailto:t28hassa@uwaterloo.ca" class="email">
            {" "}
            Email Me{" "}
          </a>
          <a
            href="https://documentcloud.adobe.com/link/review?uri=urn:aaid:scds:US:62b0da08-1e97-4ba1-a97e-6a630b329e27"
            class="Resume"
          >
            Resume{" "}
          </a>
        </div>
      </div>
    </FadeIn>
  );
}
export default Namecontainer;
