export const inventoryData = [
  { id: 1, name: 'Urea', category: 'Nitrogenous', quantity: 15000, unit: 'Metric Tons', location: 'Aonla Unit', threshold: 5000 },
  { id: 2, name: 'DAP', category: 'Phosphatic', quantity: 8500, unit: 'Metric Tons', location: 'Phulpur Unit', threshold: 3000 },
  { id: 3, name: 'NPK', category: 'Complex', quantity: 6200, unit: 'Metric Tons', location: 'Kalol Unit', threshold: 2000 },
  { id: 4, name: 'MOP', category: 'Potassic', quantity: 4800, unit: 'Metric Tons', location: 'Kandla Unit', threshold: 1500 },
  { id: 5, name: 'SSP', category: 'Phosphatic', quantity: 3200, unit: 'Metric Tons', location: 'Paradeep Unit', threshold: 1000 },
];

export const orderData = [
  { id: 'ORD-2025-0001', product: 'Urea', quantity: 500, unit: 'Metric Tons', status: 'Delivered', retailer: 'Agri Supplies Ltd', deliveryDate: '2025-05-10', location: 'Delhi NCR' },
  { id: 'ORD-2025-0002', product: 'DAP', quantity: 300, unit: 'Metric Tons', status: 'In Transit', retailer: 'Farm Solutions Pvt', deliveryDate: '2025-05-18', location: 'Punjab' },
  { id: 'ORD-2025-0003', product: 'NPK', quantity: 250, unit: 'Metric Tons', status: 'Processing', retailer: 'Krishna Fertilizers', deliveryDate: '2025-05-22', location: 'Uttar Pradesh' },
  { id: 'ORD-2025-0004', product: 'MOP', quantity: 150, unit: 'Metric Tons', status: 'Pending', retailer: 'Green Growth Inc', deliveryDate: '2025-05-25', location: 'Karnataka' },
  { id: 'ORD-2025-0005', product: 'SSP', quantity: 200, unit: 'Metric Tons', status: 'Confirmed', retailer: 'Haryana Agro Corp', deliveryDate: '2025-05-20', location: 'Haryana' },
];

export const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
  { month: 'Jul', sales: 7000 },
  { month: 'Aug', sales: 8000 },
  { month: 'Sep', sales: 7500 },
  { month: 'Oct', sales: 9000 },
  { month: 'Nov', sales: 8500 },
  { month: 'Dec', sales: 10000 },
];

export const deliveryData = [
  { id: 'DEL-2025-0001', orderId: 'ORD-2025-0001', vehicle: 'TN-01-AB-1234', driver: 'Raj Kumar', status: 'Delivered', departureTime: '2025-05-09 08:00', deliveryTime: '2025-05-10 14:30' },
  { id: 'DEL-2025-0002', orderId: 'ORD-2025-0002', vehicle: 'HR-02-CD-5678', driver: 'Amit Singh', status: 'In Transit', departureTime: '2025-05-16 09:15', deliveryTime: '2025-05-18 16:00' },
  { id: 'DEL-2025-0003', orderId: 'ORD-2025-0003', vehicle: 'UP-15-EF-9012', driver: 'Sanjay Verma', status: 'Scheduled', departureTime: '2025-05-21 07:30', deliveryTime: '2025-05-22 12:45' },
  { id: 'DEL-2025-0004', orderId: 'ORD-2025-0004', vehicle: 'KA-19-GH-3456', driver: 'Prakash Rao', status: 'Pending', departureTime: '2025-05-24 06:45', deliveryTime: '2025-05-25 10:30' },
  { id: 'DEL-2025-0005', orderId: 'ORD-2025-0005', vehicle: 'HR-29-IJ-7890', driver: 'Deepak Sharma', status: 'Scheduled', departureTime: '2025-05-19 10:00', deliveryTime: '2025-05-20 15:15' },
];

export const alertsData = [
  { id: 1, type: 'inventory', message: 'Urea stock below threshold at Delhi Distribution Center', severity: 'high', timestamp: '2025-05-15 09:23:14' },
  { id: 2, type: 'delivery', message: 'Delivery DEL-2025-0002 delayed due to traffic congestion', severity: 'medium', timestamp: '2025-05-16 14:37:22' },
  { id: 3, type: 'order', message: 'New bulk order received from Krishna Fertilizers', severity: 'info', timestamp: '2025-05-16 11:05:48' },
  { id: 4, type: 'production', message: 'Production target exceeded for DAP at Phulpur Unit', severity: 'info', timestamp: '2025-05-15 17:42:31' },
  { id: 5, type: 'inventory', message: 'MOP stock approaching threshold at Kandla Unit', severity: 'medium', timestamp: '2025-05-16 08:15:09' },
];

export const productionData = [
  { product: 'Urea', target: 20000, actual: 21500, unit: 'Metric Tons', location: 'Aonla Unit', month: 'May 2025' },
  { product: 'DAP', target: 12000, actual: 12800, unit: 'Metric Tons', location: 'Phulpur Unit', month: 'May 2025' },
  { product: 'NPK', target: 8000, actual: 7600, unit: 'Metric Tons', location: 'Kalol Unit', month: 'May 2025' },
  { product: 'MOP', target: 6000, actual: 5900, unit: 'Metric Tons', location: 'Kandla Unit', month: 'May 2025' },
  { product: 'SSP', target: 4500, actual: 4700, unit: 'Metric Tons', location: 'Paradeep Unit', month: 'May 2025' },
];

export const distributionCenters = [
  { id: 1, name: 'Delhi Distribution Center', capacity: 25000, utilized: 18500, address: 'Industrial Area, Delhi NCR', coordinates: { lat: 28.7041, lng: 77.1025 } },
  { id: 2, name: 'Punjab Distribution Center', capacity: 18000, utilized: 12000, address: 'Grain Market, Ludhiana', coordinates: { lat: 30.9010, lng: 75.8573 } },
  { id: 3, name: 'UP Distribution Center', capacity: 20000, utilized: 14500, address: 'Industrial Area, Lucknow', coordinates: { lat: 26.8467, lng: 80.9462 } },
  { id: 4, name: 'Karnataka Distribution Center', capacity: 15000, utilized: 9000, address: 'Industrial Hub, Bengaluru', coordinates: { lat: 12.9716, lng: 77.5946 } },
  { id: 5, name: 'Haryana Distribution Center', capacity: 16000, utilized: 11000, address: 'Transport Nagar, Karnal', coordinates: { lat: 29.6857, lng: 76.9905 } },
];

export const vehicles = [
  { id: 'VEH-001', type: 'Truck', capacity: 20, unit: 'Metric Tons', registrationNumber: 'TN-01-AB-1234', currentStatus: 'In Transit', location: 'Delhi NCR', driver: 'Raj Kumar' },
  { id: 'VEH-002', type: 'Truck', capacity: 15, unit: 'Metric Tons', registrationNumber: 'HR-02-CD-5678', currentStatus: 'Loading', location: 'Punjab', driver: 'Amit Singh' },
  { id: 'VEH-003', type: 'Truck', capacity: 25, unit: 'Metric Tons', registrationNumber: 'UP-15-EF-9012', currentStatus: 'Available', location: 'Uttar Pradesh', driver: 'Sanjay Verma' },
  { id: 'VEH-004', type: 'Truck', capacity: 18, unit: 'Metric Tons', registrationNumber: 'KA-19-GH-3456', currentStatus: 'Maintenance', location: 'Karnataka', driver: 'Prakash Rao' },
  { id: 'VEH-005', type: 'Truck', capacity: 22, unit: 'Metric Tons', registrationNumber: 'HR-29-IJ-7890', currentStatus: 'Available', location: 'Haryana', driver: 'Deepak Sharma' },
];

export const demandForecastData = [
  { month: 'Jun 2025', urea: 18000, dap: 9000, npk: 7000, mop: 5000, ssp: 3500 },
  { month: 'Jul 2025', urea: 20000, dap: 11000, npk: 7500, mop: 5500, ssp: 4000 },
  { month: 'Aug 2025', urea: 22000, dap: 12000, npk: 8000, mop: 6000, ssp: 4200 },
  { month: 'Sep 2025', urea: 25000, dap: 13500, npk: 9000, mop: 6500, ssp: 4500 },
  { month: 'Oct 2025', urea: 23000, dap: 12500, npk: 8500, mop: 6200, ssp: 4300 },
  { month: 'Nov 2025', urea: 21000, dap: 11500, npk: 8200, mop: 6000, ssp: 4100 },
];