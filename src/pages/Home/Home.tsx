import React from 'react';
import novaLogo from '../../assets/images/nova-logo.png';
import novaStorefront from '../../assets/images/nova-storefront-image.jpg';
import { BUSINESS_INFO, DELIVERY_OPTIONS } from '../../utils/constants';
import './Home.css';
import { 
  FaBox, FaUserMd, FaMobile, FaBars, FaTimes, 
  FaPrescriptionBottleAlt, FaShieldAlt,
  FaEnvelope, FaCapsules, FaClipboardList,
  FaHandHoldingMedical, FaFileInvoiceDollar, FaCalendarCheck,
  FaCheck, FaPhoneAlt, FaRocket, FaBolt, FaTruck
} from 'react-icons/fa';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';
import { checkDeliveryRange, type GeocodingResult, DELIVERY_RADIUS } from '../../services/geocoding';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

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
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string>('standard');

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setAddress(place.formatted_address);
        handleAddressCheck(place.formatted_address);
      }
    }
  };

  const handleAddressCheck = async (addressToCheck: string = address) => {
    if (!addressToCheck.trim()) {
      setDeliveryStatus({
        isInRange: false,
        error: 'Please enter a delivery address'
      });
      return;
    }

    setLoading(true);
    setDeliveryStatus(null);

    try {
      const result = await checkDeliveryRange(addressToCheck);
      setDeliveryStatus(result);
    } catch (error) {
      setDeliveryStatus({
        isInRange: false,
        error: 'An error occurred while checking the address. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Add scroll event handlers
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const isAtEnd = target.scrollLeft + target.clientWidth >= target.scrollWidth - 20;
    
    if (isAtEnd) {
      target.classList.add('at-end');
    } else {
      target.classList.remove('at-end');
    }
  };

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
              <li><a href="#prescriptions" onClick={() => setIsMenuOpen(false)}>Prescriptions</a></li>
              <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
              <li><a href="#insurance" onClick={() => setIsMenuOpen(false)}>Insurance</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <section 
          className={`hero ${deliveryStatus ? 'address-active' : ''}`}
          style={{ 
            '--hero-bg-image': `url(${novaStorefront})`,
            backgroundImage: `url(${novaStorefront})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } as React.CSSProperties}
        >
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <span className="highlight">Modern Care,</span>
                <br />
                Traditional Values
              </h1>
              <p className="subtitle">Free same-day prescription delivery to your door</p>
              <p className="tagline">
                Experience personalized pharmacy care with a modern touch. 
                Where boutique service meets digital convenience.
              </p>
            </div>
            
            <div className="search-container">
              <LoadScript 
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
              >
                <div className="search-input-wrapper">
                  <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                    restrictions={{ country: 'us' }}
                    fields={['formatted_address', 'geometry']}
                  >
                    <input 
                      placeholder="Enter delivery address"
                      className="search-input"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={loading}
                      aria-label="Delivery address"
                      autoComplete="off"
                    />
                  </Autocomplete>
                </div>
              </LoadScript>
              <button 
                className={`btn btn-primary search-btn ${loading ? 'loading' : ''}`}
                onClick={() => handleAddressCheck()}
                disabled={loading}
                aria-label="Check delivery availability"
              >
                {loading ? 'Checking...' : 'Check Address'}
              </button>
              {deliveryStatus && (
                <div 
                  className={`delivery-status ${deliveryStatus.isInRange ? 'available' : 'unavailable'}`}
                  role="alert"
                  aria-live="polite"
                >
                  {deliveryStatus.error ? (
                    <p className="error-message">{deliveryStatus.error}</p>
                  ) : deliveryStatus.isInRange ? (
                    <>
                      <p>✅ Great news! We deliver to:</p>
                      <p className="formatted-address">{deliveryStatus.formattedAddress}</p>
                      <p className="distance">({deliveryStatus.distance} miles away)</p>
                      
                      <div className="delivery-options">
                        <h4>Choose Your Delivery Speed:</h4>
                        <div className="delivery-options-grid">
                          {Object.values(DELIVERY_OPTIONS).map((option) => {
                            const getIcon = (id: string) => {
                              switch(id) {
                                case 'standard':
                                  return <FaTruck className="delivery-icon" />;
                                case 'two_hour':
                                  return <FaRocket className="delivery-icon" />;
                                case 'one_hour':
                                  return <FaBolt className="delivery-icon" />;
                                default:
                                  return <FaTruck className="delivery-icon" />;
                              }
                            };

                            return (
                              <label 
                                key={option.id}
                                className={`delivery-option ${selectedDelivery === option.id ? 'selected' : ''}`}
                              >
                                <input
                                  type="radio"
                                  name="deliveryOption"
                                  value={option.id}
                                  checked={selectedDelivery === option.id}
                                  onChange={(e) => setSelectedDelivery(e.target.value)}
                                  className="delivery-radio"
                                />
                                <div className="delivery-option-content">
                                  <div className="delivery-option-header">
                                    <div className="delivery-option-left">
                                      {getIcon(option.id)}
                                      <div className="delivery-option-text">
                                        <span className="delivery-option-label">{option.label}</span>
                                        <span className="delivery-option-time">
                                          <FaCalendarCheck />
                                          {option.time}
                                        </span>
                                      </div>
                                    </div>
                                    <span className="delivery-option-price">
                                      {option.price === 0 ? 'FREE' : `$${option.price}`}
                                    </span>
                                  </div>
                                  <span className="delivery-option-description">{option.description}</span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>❌ Sorry, this address is outside our delivery area:</p>
                      <p className="formatted-address">{deliveryStatus.formattedAddress}</p>
                      <p className="distance">({deliveryStatus.distance} miles away - we only deliver within {DELIVERY_RADIUS} miles)</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Experience a better pharmacy</h2>
          <div className="features-grid" onScroll={handleScroll}>
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
            <div className="service-grid" onScroll={handleScroll}>
              <div className="service-card">
                <FaCapsules className="service-icon" />
                <h3>New Prescriptions</h3>
                <p className="service-description">Easy transfer of your prescriptions to our pharmacy</p>
                <ul className="service-features">
                  <li><FaCheck className="check-icon" />Free prescription transfer service</li>
                  <li><FaCheck className="check-icon" />Same-day prescription filling</li>
                  <li><FaCheck className="check-icon" />Insurance coordination handled for you</li>
                </ul>
                <div className="card-contact">
                  <FaPhoneAlt className="phone-icon" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="contact-link">
                    Call to inquire
                  </a>
                </div>
              </div>

              <div className="service-card">
                <FaClipboardList className="service-icon" />
                <h3>Refills</h3>
                <p className="service-description">Quick and convenient prescription refills</p>
                <ul className="service-features">
                  <li><FaCheck className="check-icon" />Automated refill reminders</li>
                  <li><FaCheck className="check-icon" />Mobile app refill requests</li>
                  <li><FaCheck className="check-icon" />24/7 online refill service</li>
                </ul>
                <div className="card-contact">
                  <FaPhoneAlt className="phone-icon" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="contact-link">
                    Call to inquire
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-content">
            <h2><FaHandHoldingMedical /> Services</h2>
            <div className="service-grid" onScroll={handleScroll}>
              <div className="service-card">
                <FaUserMd className="service-icon" />
                <h3>Medication Counseling</h3>
                <p className="service-description">Expert advice from our experienced pharmacists</p>
                <ul className="service-features">
                  <li><FaCheck className="check-icon" />Private consultation room</li>
                  <li><FaCheck className="check-icon" />Medication therapy reviews</li>
                  <li><FaCheck className="check-icon" />Drug interaction checks</li>
                </ul>
                <div className="card-contact">
                  <FaPhoneAlt className="phone-icon" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="contact-link">
                    Call to inquire
                  </a>
                </div>
              </div>

              <div className="service-card">
                <FaCalendarCheck className="service-icon" />
                <h3>Medication Synchronization</h3>
                <p className="service-description">Get all your medications on the same day each month</p>
                <ul className="service-features">
                  <li><FaCheck className="check-icon" />Coordinated refill schedule</li>
                  <li><FaCheck className="check-icon" />Monthly medication review</li>
                  <li><FaCheck className="check-icon" />Automatic refill program</li>
                </ul>
                <div className="card-contact">
                  <FaPhoneAlt className="phone-icon" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="contact-link">
                    Call to inquire
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="insurance" className="section">
          <div className="section-content">
            <h2><FaShieldAlt /> Insurance Coverage</h2>
            <div className="insurance-grid" onScroll={handleScroll}>
              <div className="insurance-card primary">
                <FaFileInvoiceDollar className="insurance-icon" />
                <h3>Accepted Insurance Plans</h3>
                <p className="insurance-description">
                  We work with most major insurance providers to make your medications affordable
                </p>
                <ul className="insurance-features">
                  <li><FaCheck /> Medicare Part D</li>
                  <li><FaCheck /> Medicaid</li>
                  <li><FaCheck /> Private Insurance</li>
                  <li><FaCheck /> Workers' Compensation</li>
                </ul>
                <div className="card-contact">
                  <FaPhoneAlt className="phone-icon" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="contact-link">
                    Call to verify coverage
                  </a>
                </div>
              </div>

              <div className="service-card">
                <FaPhoneAlt className="service-icon" />
                <h3>Need Help?</h3>
                <p className="service-description">Our team is here to assist with your insurance questions</p>
                <ul className="service-features">
                  <li><FaCheck className="check-icon" />Insurance verification</li>
                  <li><FaCheck className="check-icon" />Coverage explanation</li>
                  <li><FaCheck className="check-icon" />Cost estimates</li>
                </ul>
                <div className="card-contact">
                  <FaPhoneAlt className="phone-icon" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="contact-link">
                    Call to verify coverage
                  </a>
                </div>
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