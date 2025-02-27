import React from 'react';
import novaLogo from '../../assets/images/nova-logo.png';
import { BUSINESS_INFO } from '../../utils/constants';
import './Home.css';
import { 
  FaBox, FaUserMd, FaMobile, FaBars, FaTimes, 
  FaPrescriptionBottleAlt, FaShieldAlt,
  FaMapMarkedAlt, FaEnvelope, FaCapsules, FaClipboardList,
  FaHandHoldingMedical, FaFileInvoiceDollar, FaCalendarCheck,
  FaPhone, FaCheck
} from 'react-icons/fa';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';
import cosmetics1 from '../../assets/images/cosmetics1.jpg';
import cosmetics2 from '../../assets/images/cosmetics2.jpg';
import pharmacy1 from '../../assets/images/pharmacy1.jpg';
import pharmacy2 from '../../assets/images/pharmacy2.jpg';
import { checkDeliveryRange, type GeocodingResult, DELIVERY_RADIUS } from '../../services/geocoding';

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
  const [address, setAddress] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<GeocodingResult | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleAddressCheck = async () => {
    if (!address.trim()) {
      return;
    }

    setLoading(true);
    setDeliveryStatus(null);

    const result = await checkDeliveryRange(address);
    setDeliveryStatus(result);
    setLoading(false);
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
            <p className="tagline">Experience boutique pharmacy care with a modern touch. 
              Where personalized service meets cutting-edge convenience.</p>
            
            <div className="search-container">
              <input 
                placeholder="Enter delivery address"
                className="search-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddressCheck()}
              />
              <button 
                className={`btn btn-primary search-btn ${loading ? 'loading' : ''}`}
                onClick={handleAddressCheck}
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Check Address'}
              </button>
              {deliveryStatus && (
                <div className={`delivery-status ${deliveryStatus.isInRange ? 'available' : 'unavailable'}`}>
                  {deliveryStatus.error ? (
                    <p className="error-message">{deliveryStatus.error}</p>
                  ) : deliveryStatus.isInRange ? (
                    <p>✅ Great news! We deliver to your address ({deliveryStatus.distance} miles away)</p>
                  ) : (
                    <p>❌ Sorry, this address is outside our {DELIVERY_RADIUS}-mile delivery area</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="hero-background">
            <div className="image-grid">
              <div className="image-wrapper">
                <img src={pharmacy1} alt="" className="hero-image" />
              </div>
              <div className="image-wrapper">
                <img src={cosmetics1} alt="" className="hero-image" />
              </div>
              <div className="image-wrapper">
                <img src={pharmacy2} alt="" className="hero-image" />
              </div>
              <div className="image-wrapper">
                <img src={cosmetics2} alt="" className="hero-image" />
              </div>
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
                <p className="service-description">Easy transfer of your prescriptions to our pharmacy</p>
                <ul className="service-features">
                  <li>
                    <FaCheck className="check-icon" />
                    Free prescription transfer service
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    Same-day prescription filling
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    Insurance coordination handled for you
                  </li>
                </ul>
                <button className="btn btn-outline">Transfer Now</button>
              </div>

              <div className="service-card">
                <FaClipboardList className="service-icon" />
                <h3>Refills</h3>
                <p className="service-description">Quick and convenient prescription refills</p>
                <ul className="service-features">
                  <li>
                    <FaCheck className="check-icon" />
                    Automated refill reminders
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    Mobile app refill requests
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    24/7 online refill service
                  </li>
                </ul>
                <button className="btn btn-outline">Request Refill</button>
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
                <p className="service-description">Expert advice from our experienced pharmacists</p>
                <ul className="service-features">
                  <li>
                    <FaCheck className="check-icon" />
                    Private consultation room
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    Medication therapy reviews
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    Drug interaction checks
                  </li>
                </ul>
                <button className="btn btn-outline">Schedule Consultation</button>
              </div>

              <div className="service-card">
                <FaCalendarCheck className="service-icon" />
                <h3>Medication Synchronization</h3>
                <p className="service-description">Get all your medications on the same day each month</p>
                <ul className="service-features">
                  <li>
                    <FaCheck className="check-icon" />
                    Coordinated refill schedule
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    Monthly medication review
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    Automatic refill program
                  </li>
                </ul>
                <button className="btn btn-outline">Sync Medications</button>
              </div>
            </div>
          </div>
        </section>

        <section id="insurance" className="section">
          <div className="section-content">
            <h2><FaShieldAlt /> Insurance</h2>
            <div className="insurance-content">
              <div className="insurance-card">
                <FaFileInvoiceDollar className="large-icon" />
                <div className="insurance-text">
                  <h3>We Accept Most Insurance Plans</h3>
                  <p className="insurance-description">Contact us to verify your coverage</p>
                  <ul className="insurance-features">
                    <li>
                      <FaCheck className="check-icon" />
                      Medicare Part D plans accepted
                    </li>
                    <li>
                      <FaCheck className="check-icon" />
                      Most major insurance providers
                    </li>
                    <li>
                      <FaCheck className="check-icon" />
                      Prescription discount programs
                    </li>
                  </ul>
                  <button className="btn btn-outline">Verify Coverage</button>
                </div>
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