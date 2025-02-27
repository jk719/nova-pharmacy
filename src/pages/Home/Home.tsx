import React from 'react';
import novaLogo from '../../assets/images/nova-logo.png';
import { BUSINESS_INFO } from '../../utils/constants';
import './Home.css';
import { 
  FaBox, FaUserMd, FaMobile, FaBars, FaTimes, 
  FaPrescriptionBottleAlt, FaShieldAlt,
  FaMapMarkedAlt, FaEnvelope, FaCapsules, FaClipboardList,
  FaHandHoldingMedical, FaFileInvoiceDollar, FaCalendarCheck,
  FaPhone
} from 'react-icons/fa';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';

// Add type for feature details
type FeatureDetail = {
  icon: React.ReactNode;
  description: string;
};

type FeatureDetails = {
  [key: string]: FeatureDetail;
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featureDetails: FeatureDetails = {
    "Free Same-Day Delivery": {
      icon: <FaBox />,
      description: "Get your medications delivered right to your door at no extra cost, same day"
    },
    "Expert Pharmacist Care": {
      icon: <FaUserMd />,
      description: "Our experienced pharmacists are here to answer all your questions"
    },
    "Easy Prescription Management": {
      icon: <FaMobile />,
      description: "Manage your medications easily through our mobile app"
    },
    "Insurance Accepted": {
      icon: <FaShieldAlt />,
      description: "We work with most major insurance providers to keep your costs low"
    },
    "Medication Synchronization": {
      icon: <FaCalendarCheck />,
      description: "Get all your medications refilled on the same day each month"
    },
    "Automated Refills": {
      icon: <FaClipboardList />,
      description: "Never miss a dose with our automatic refill program"
    }
  };

  return (
    <div className="home">
      <header className="header">
        <nav className="nav-container">
          <div className="nav-left">
            <img src={novaLogo} alt={BUSINESS_INFO.name} className="logo" />
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
              <li><a href="#prescriptions">Prescriptions</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#insurance">Insurance</a></li>
              <li><a href="#locations">Location</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Pharmacy Made Simple</h1>
            <p className="subtitle">Get your prescriptions delivered for free, right to your door.</p>
            
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Enter your address to check delivery" 
                className="search-input"
              />
              <button className="btn btn-primary search-btn">Check Address</button>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Experience a better pharmacy</h2>
          <div className="features-grid">
            {BUSINESS_INFO.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {featureDetails[feature]?.icon || <FaBox />}
                </div>
                <h3>{feature}</h3>
                <p className="feature-description">
                  {featureDetails[feature]?.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="prescriptions" className="section">
          <div className="section-content">
            <h2><FaPrescriptionBottleAlt /> Prescriptions</h2>
            <div className="service-grid">
              <div className="service-card">
                <FaCapsules className="service-icon" />
                <h3>New Prescriptions</h3>
                <p>Easy transfer of your prescriptions to our pharmacy</p>
              </div>
              <div className="service-card">
                <FaClipboardList className="service-icon" />
                <h3>Refills</h3>
                <p>Quick and convenient prescription refills</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-content">
            <h2><FaHandHoldingMedical /> Services</h2>
            <div className="service-grid">
              <div className="service-card">
                <FaUserMd className="service-icon" />
                <h3>Medication Counseling</h3>
                <p>Expert advice from our pharmacists</p>
              </div>
              <div className="service-card">
                <FaCalendarCheck className="service-icon" />
                <h3>Medication Synchronization</h3>
                <p>Get all your medications on the same day</p>
              </div>
            </div>
          </div>
        </section>

        <section id="insurance" className="section">
          <div className="section-content">
            <h2><FaShieldAlt /> Insurance</h2>
            <div className="insurance-content">
              <FaFileInvoiceDollar className="large-icon" />
              <div className="insurance-text">
                <h3>We Accept Most Insurance Plans</h3>
                <p>Contact us to verify your coverage</p>
              </div>
            </div>
          </div>
        </section>

        <section id="locations" className="section">
          <div className="section-content">
            <h2><FaMapMarkedAlt /> Location</h2>
            <div className="location-content">
              <div className="map-container">
                {/* Add Google Maps iframe here */}
              </div>
              <div className="location-details">
                <p><FaMapMarkedAlt /> {BUSINESS_INFO.address}</p>
                <p><FaPhone /> {BUSINESS_INFO.phone}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-content">
            <h2><FaEnvelope /> Contact Us</h2>
            <div className="contact-form">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Message"></textarea>
              <button className="btn btn-primary">Send Message</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home; 