const PHARMACY_LOCATION = {
  lat: 40.75695, // Nova Pharmacy Queens coordinates
  lng: -73.86234
};

export const DELIVERY_RADIUS = 3; // miles

export type GeocodingResult = {
  isInRange: boolean;
  distance?: number;
  error?: string;
  formattedAddress?: string;
  deliveryOptions?: {
    standard: boolean;
    twoHour: boolean;
    oneHour: boolean;
  };
};

export const checkDeliveryRange = async (address: string): Promise<GeocodingResult> => {
  if (!address.trim()) {
    return {
      isInRange: false,
      error: 'Please enter a valid address'
    };
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return {
      isInRange: false,
      error: 'Service configuration error. Please contact support.'
    };
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'REQUEST_DENIED') {
      console.error('API Error:', data.error_message);
      return {
        isInRange: false,
        error: 'Service temporarily unavailable. Please try again later.'
      };
    }

    if (data.status === 'ZERO_RESULTS') {
      return {
        isInRange: false,
        error: 'Address not found. Please check the address and try again.'
      };
    }
    
    if (data.status !== 'OK') {
      console.error('Geocoding API Error:', data);
      throw new Error(data.error_message || `Geocoding failed: ${data.status}`);
    }

    if (!data.results || !data.results[0]) {
      return {
        isInRange: false,
        error: 'Invalid address format. Please try again.'
      };
    }

    const location = data.results[0].geometry.location;
    const formattedAddress = data.results[0].formatted_address;
    
    const distance = calculateDistance(
      PHARMACY_LOCATION.lat,
      PHARMACY_LOCATION.lng,
      location.lat,
      location.lng
    );
    
    return {
      isInRange: distance <= DELIVERY_RADIUS,
      distance: Number(distance.toFixed(1)),
      formattedAddress,
      deliveryOptions: {
        standard: distance <= DELIVERY_RADIUS,
        twoHour: distance <= DELIVERY_RADIUS,
        oneHour: distance <= DELIVERY_RADIUS
      }
    };
  } catch (err) {
    console.error('Error in checkDeliveryRange:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
    
    if (errorMessage.includes('API project is not authorized')) {
      return {
        isInRange: false,
        error: 'Service is being configured. Please try again in a few minutes.'
      };
    }

    return {
      isInRange: false,
      error: 'Unable to verify address. Please try again later.'
    };
  }
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}; 