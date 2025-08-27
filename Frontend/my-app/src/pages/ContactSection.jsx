import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import '../../public/style.css'

const ContactSection = () => {
  return (
    <div className="contactsection">
      <div>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF style={{ margin: "10px", color: "#000000" }} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter style={{ margin: "10px", color: "#000000" }} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram style={{ margin: "10px", color: "#000000" }} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn style={{ margin: "10px", color: "#000000" }} />
        </a>
      </div>

      <div className="linesection">
        {[
          "Home",
          "Products",
          "Free Support",
          "Free Consulting",
          "Blog",
          "Website",
          "About"
        ].map((item, index, array) => (
          <React.Fragment key={item}>
            <p style={{ margin: "15px" }}>{item}</p>
            {index < array.length - 1 && <p style={{ margin: "15px" }}>|</p>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
