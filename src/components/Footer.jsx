import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
    <ul className="social-icons">
      <li>
        <a
          href="https://github.com/ayomide-23"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="icon"/>
        </a>
      </li>
      <li>
        <a
          href="https://x.com/ayomide_aap"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
        >
         <FontAwesomeIcon icon={faTwitter} className="icon"/>
        </a>
      </li>
      <li>
        <a
          href="https://wa.me/+2347013841793"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="icon"/>
        </a>
      </li>
    </ul>
    <div className="footer-text">
        <p>&copy; {new Date().getFullYear} FlavorHub's Recipe App</p>
        <p>Made with <span style={{color: 'red'}}>Love</span> by Ayomide</p>
    </div>
    </footer>
  );
};

export default Footer;
