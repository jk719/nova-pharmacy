const PHARMACY_LOCATION = {
  lat: 40.75695, // Nova Pharmacy Queens coordinates
  lng: -73.86234
};

export const DELIVERY_RADIUS = 3; // miles

export type GeocodingResult = {
  isInRange: boolean;
  distance?: number;
  error?: string;
};

export const checkDeliveryRange = async (address: string): Promise<GeocodingResult> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error('Address not found');
    }

    const location = data.results[0].geometry.location;
    const distance = calculateDistance(
      PHARMACY_LOCATION.lat,
      PHARMACY_LOCATION.lng,
      location.lat,
      location.lng
    );

    return {
      isInRange: distance <= DELIVERY_RADIUS,
      distance: Number(distance.toFixed(1))
    };
  } catch (err) {
    return {
      isInRange: false,
      error: 'Unable to verify address. Please try again.'
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