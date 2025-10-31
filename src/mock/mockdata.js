// Updated drug data with expiry dates and minimum stock levels
export const drugs = [
  { id: 1, drugName: "Amoxicillin", class: "Antibiotic", stock: 20, minStock: 10, sellingPrice: 600, costPrice: 400, expiryDate: "2025-12-10" },
  { id: 2, drugName: "Paracetamol", class: "Analgesic", stock: 20, minStock: 20, sellingPrice: 400, costPrice: 200, expiryDate: "2026-03-15" },
  { id: 3, drugName: "Ciprofloxacin", class: "Antibiotic", stock: 15, minStock: 10, sellingPrice: 1000, costPrice: 600, expiryDate: "2025-11-25" },
  { id: 4, drugName: "Ibuprofen", class: "Analgesic", stock: 30, minStock: 15, sellingPrice: 800, costPrice: 500, expiryDate: "2026-01-30" },
  { id: 5, drugName: "Metformin", class: "Antidiabetic", stock: 25, minStock: 10, sellingPrice: 1200, costPrice: 800, expiryDate: "2025-10-28" },
  { id: 6, drugName: "Lisinopril", class: "Antihypertensive", stock: 10, minStock: 10, sellingPrice: 1500, costPrice: 1000, expiryDate: "2025-09-30" },
  { id: 7, drugName: "Omeprazole", class: "Antacid", stock: 40, minStock: 15, sellingPrice: 700, costPrice: 400, expiryDate: "2026-05-05" },
  { id: 8, drugName: "Aspirin", class: "Analgesic", stock: 35, minStock: 20, sellingPrice: 500, costPrice: 300, expiryDate: "2025-12-20" },
  { id: 9, drugName: "Simvastatin", class: "Antihyperlipidemic", stock: 20, minStock: 10, sellingPrice: 1300, costPrice: 900, expiryDate: "2026-02-14" },
  { id: 10, drugName: "Captopril", class: "Antihypertensive", stock: 15, minStock: 10, sellingPrice: 1400, costPrice: 950, expiryDate: "2025-11-01" },
  { id: 11, drugName: "Prednisone", class: "Corticosteroid", stock: 18, minStock: 10, sellingPrice: 900, costPrice: 600, expiryDate: "2025-12-08" },
  { id: 12, drugName: "Warfarin", class: "Anticoagulant", stock: 12, minStock: 10, sellingPrice: 2000, costPrice: 1500, expiryDate: "2025-10-22" },
  { id: 13, drugName: "Azithromycin", class: "Antibiotic", stock: 22, minStock: 10, sellingPrice: 1100, costPrice: 700, expiryDate: "2025-12-15" },
  { id: 14, drugName: "Metoprolol", class: "Antihypertensive", stock: 16, minStock: 10, sellingPrice: 1250, costPrice: 850, expiryDate: "2025-11-18" },
];

// Mock drug interactions
export const drugInteractions = [
  { drugs: ["Amoxicillin", "Ciprofloxacin"], message: "Amoxicillin and Ciprofloxacin may interact. Use with caution.", risk: "Moderate" },
  { drugs: ["Lisinopril", "Ibuprofen"], message: "Lisinopril and Ibuprofen may reduce kidney function. Monitor closely.", risk: "High" },
  { drugs: ["Metformin", "Omeprazole"], message: "No significant interactions found between Metformin and Omeprazole.", risk: "Safe" },
  { drugs: ["Warfarin", "Aspirin"], message: "Warfarin and Aspirin may increase risk of bleeding. Use only under supervision.", risk: "High" },
  { drugs: ["Simvastatin", "Ciprofloxacin"], message: "Simvastatin and Ciprofloxacin may increase risk of muscle damage.", risk: "Moderate" },
  { drugs: ["Prednisone", "Metformin"], message: "Prednisone may increase blood sugar levels in patients on Metformin.", risk: "Moderate" },
  { drugs: ["Metoprolol", "Captopril"], message: "Metoprolol and Captopril may lower blood pressure significantly when combined.", risk: "Moderate" },
  { drugs: ["Azithromycin", "Ciprofloxacin"], message: "Azithromycin and Ciprofloxacin may increase risk of heart rhythm issues.", risk: "High" },
];

// Utility to check low stock or near-expiry drugs
export const checkDrugAlerts = (drugs) => {
  const today = new Date();
  const nearExpiryThreshold = 30; // days

  const lowStock = drugs.filter((d) => d.stock <= d.minStock);
  const expiringSoon = drugs.filter((d) => {
    const expiry = new Date(d.expiryDate);
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return diffDays <= nearExpiryThreshold && diffDays >= 0;
  });

  return { lowStock, expiringSoon };
};
