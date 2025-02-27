import { FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BUSINESS_INFO } from '../../utils/constants';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact & Location</h3>
          <div className="contact-item">
            <FaPhone /> <span>{BUSINESS_INFO.phone}</span>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt /> <span>{BUSINESS_INFO.address}</span>
          </div>
          <div className="social-links">
            <a href="#" className="social-link"><FaFacebook /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer-section hours-section">
          <h3>Hours</h3>
          <div className="hours-container">
            <div className="hours-row">
              <span>Mon-Fri:</span>
              <span>12:00 PM - 8:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Sat-Sun:</span>
              <span>12:00 PM - 6:00 PM</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#prescriptions">Prescriptions</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#insurance">Insurance</a></li>
            <li><a href="#locations">Location</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 