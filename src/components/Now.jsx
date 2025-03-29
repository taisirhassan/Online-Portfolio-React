import React from 'react';
import '../styles/Now.scss';

const Now = () => {
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="now">
      <div className="now__header">
        <h2 className="now__title">What I'm doing now</h2>
        <p className="now__date">Last updated: {currentDate}</p>
      </div>

      <div className="now__section">
        <h3 className="now__section-title">Current Focus</h3>
        <ul className="now__list">
          <li>Working on satellite communications firmware at Telesat</li>
          <li>Member of the design team at UW Rocketry</li>
          <li>Contributing to the UWASIC team's chip design efforts</li>
        </ul>
      </div>

      <div className="now__section">
        <h3 className="now__section-title">Academic & Research</h3>
        <ul className="now__list">
          <li>Exploring open-source silicon design flows with the UWASIC lab</li>
          <li>Studying advanced hardware description languages and verification methodologies</li>
          <li>Learning about space-grade electronics and radiation hardening techniques</li>
        </ul>
      </div>

      <div className="now__section">
        <h3 className="now__section-title">Currently Reading</h3>
        <ul className="now__list">
          <li>"Digital Design and Computer Architecture: RISC-V Edition" by Sarah Harris and David Harris</li>
          <li>"Analog Integrated Circuit Design" by Tony Chan Carusone, David Johns, and Kenneth Martin</li>
          <li>"CMOS VLSI Design: A Circuits and Systems Perspective" by Neil Weste and David Harris</li>
        </ul>
      </div>

      <div className="now__section">
        <h3 className="now__section-title">Learning</h3>
        <ul className="now__list">
          <li>Advanced SystemVerilog verification techniques</li>
          <li>Digital signal processing for aerospace communication systems</li>
          <li>Physical design optimization for ASIC implementations</li>
        </ul>
      </div>

      <div className="now__footer">
        <p className="now__note">This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">now page</a>, inspired by Derek Sivers. It reflects my current focus as of {currentDate.split(',')[0]}.</p>
      </div>
    </div>
  );
};

export default Now; 