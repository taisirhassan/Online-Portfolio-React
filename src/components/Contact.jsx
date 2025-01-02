import React from 'react';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <div id = "contact" className="contact">
      <div className="contact__command">$ cat contact.txt_</div>
      
      <div className="contact__content">
        <div className="contact__item">
          <Mail className="contact__icon" />
          <span>taisir.hassan@uwaterloo.ca</span>
        </div>

        <div className="contact__item">
          <Phone className="contact__icon" />
          <span>647-667-3006</span>
        </div>

        <div className="contact__social">
          <a href="https://github.com/taisirhassan" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/taisir-hassan" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;