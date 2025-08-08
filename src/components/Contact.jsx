import React from 'react';
import { Mail, Phone, Github, Linkedin, Copy } from 'lucide-react';

const Contact = () => {
  return (
    <div id = "contact" className="contact">
      <div className="contact__command">$ cat contact.txt_</div>
      
      <div className="contact__content">
        <div className="contact__item">
          <Mail className="contact__icon" />
          <a href="mailto:taisir.hassan@uwaterloo.ca">taisir.hassan@uwaterloo.ca</a>
          <button
            className="contact__copy"
            aria-label="Copy email address"
            onClick={() => navigator.clipboard?.writeText('taisir.hassan@uwaterloo.ca')}
            title="Copy"
          >
            <Copy size={16} />
          </button>
        </div>

        <div className="contact__item">
          <Phone className="contact__icon" />
          <a href="tel:+16476673006">647-667-3006</a>
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