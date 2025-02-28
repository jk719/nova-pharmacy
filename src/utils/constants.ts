export const BUSINESS_INFO = {
  name: "NOVA Q-Health : NOVA Pharmacy Queens",
  address: "104-01 Northern Blvd, Queens, NY 11368",
  phone: "(646) 809-9595",
  hours: {
    monday: "12:00 PM - 8:00 PM",
    tuesday: "12:00 PM - 8:00 PM",
    wednesday: "12:00 PM - 8:00 PM",
    thursday: "12:00 PM - 8:00 PM",
    friday: "12:00 PM - 8:00 PM",
    saturday: "12:00 PM - 6:00 PM",
    sunday: "12:00 PM - 6:00 PM"
  },
  features: [
    "Free Same-Day Delivery",
    "Expert Pharmacist Care",
    "Easy Prescription Management",
    "Insurance Accepted",
    "Medication Synchronization",
    "Automated Refills"
  ],
  rating: {
    score: 5.0,
    count: 4
  }
};

export const DELIVERY_OPTIONS = {
  STANDARD: {
    id: 'standard',
    label: 'Standard Delivery',
    time: 'Same Day',
    price: 0,
    description: 'Free same-day delivery'
  },
  TWO_HOUR: {
    id: 'two_hour',
    label: '2-Hour Delivery',
    time: '2 Hours',
    price: 5,
    description: 'Delivered within 2 hours'
  },
  ONE_HOUR: {
    id: 'one_hour',
    label: '1-Hour Delivery',
    time: '1 Hour',
    price: 7,
    description: 'Delivered within 1 hour'
  }
};

export type DeliveryOption = typeof DELIVERY_OPTIONS[keyof typeof DELIVERY_OPTIONS]; 