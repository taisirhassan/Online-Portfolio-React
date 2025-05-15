export const RESUME_FILENAME = "Taisir-Resume.pdf";

export const SOCIAL_LINKS = {
  github: "https://github.com/taisirhassan",
  linkedin: "https://linkedin.com/in/taisir-hassan",
  portfolio: "https://taisirhassan.netlify.app",
  sourceCode: "https://github.com/taisirhassan/Online-Portfolio-React"
};

export const PROJECTS = {
  hardware: [
    {
      title: "RISC-V Processor",
      tech: "Verilog, GTKWave, Icarus Verilog",
      description: "32-bit processor with 5-stage pipeline and hazard detection",
      repo: "https://github.com/taisirhassan/riscv_core"
    },
    {
      title: "De Bruijn Circuit Verification",
      tech: "Scala, Verilog, SystemVerilog",
      description: "URA Research: Digital circuit verification via De Bruijn sequences",
      repo: "https://git.uwaterloo.ca/MarkAagaard/debruijn/-/tree/main"
    },
    {
      title: "Firefighting Robot",
      tech: "C++, Arduino",
      description: "Autonomous robot with heat detection and navigation systems",
      repo: "https://github.com/taisirhassan/Firefighting-Robot"
    }
  ],
  software: [
    {
      title: "Virtual SmartHome Dashboard",
      tech: "Python, Next.js, AWS, MQTT, Docker",
      description: "IoT simulation platform with React dashboard and Go backend for data handling",
      repo: "https://github.com/taisirhassan/Smart-Home-Dashboard"
    },
    {
      title: "RPM (Remote Process Monitor)",
      tech: "QNX, C++, WebSockets, React",
      description: "cuHacking 6 Winner: Process monitor interfacing with kernel-level APIs",
      repo: "https://github.com/taisirhassan/rpm-monitor"
    },
    {
      title: "AudioViz",
      tech: "C++, OpenGL, FFT",
      description: "Real-time audio visualizer with multiple visualization styles and PortAudio",
      repo: "https://github.com/taisirhassan/audio_viz"
    },
    {
      title: "CipherStream",
      tech: "Rust, libp2p, Cryptography",
      description: "P2P file transfer using libp2p with mDNS discovery and fault-tolerant architecture",
      repo: "https://github.com/taisirhassan/cipher-stream"
    }
  ]
}; 