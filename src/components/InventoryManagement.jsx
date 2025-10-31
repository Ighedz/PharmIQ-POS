import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import Papa from "papaparse";

const InventoryManagement = ({ inventory, setInventory }) => {
  const [formData, setFormData] = useState({
    drugName: "",
    costPrice: "",
    markup: "",
    quantity: "",
    packSize: "",
    expiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateSellingPrice = (cost, markup) => {
    const costNum = parseFloat(cost) || 0;
    const markupNum = parseFloat(markup) || 0;
    return costNum * (1 + markupNum / 100);
  };

  const handleAdd = () => {
    if (!formData.drugName || !formData.costPrice || !formData.quantity) return;

    const newDrug = {
      id: Date.now(),
      drugName: formData.drugName,
      stock: parseInt(formData.quantity),
      costPrice: parseFloat(formData.costPrice),
      markup: parseFloat(formData.markup),
      sellingPrice: calculateSellingPrice(
        formData.costPrice,
        formData.markup
      ),
      packSize: formData.packSize,
      expiry: formData.expiry,
    };

    setInventory([...inventory, newDrug]);
    setFormData({
      drugName: "",
      costPrice: "",
      markup: "",
      quantity: "",
      packSize: "",
      expiry: "",
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const uploadedDrugs = results.data.map((item) => ({
          id: Date.now() + Math.random(),
          drugName: item.drugName.trim(),
          stock: parseInt(item.quantity) || 0,
          costPrice: parseFloat(item.costPrice) || 0,
          markup: parseFloat(item.markup) || 0,
          sellingPrice:
            parseFloat(item.costPrice) * (1 + parseFloat(item.markup) / 100),
          packSize: item.packSize || "-",
          expiry: item.expiry || "-",
        }));

        const merged = [...inventory];
        uploadedDrugs.forEach((drug) => {
          const existing = merged.find(
            (d) => d.drugName.toLowerCase() === drug.drugName.toLowerCase()
          );
          if (existing) {
            existing.stock += drug.stock;
            existing.costPrice = drug.costPrice || existing.costPrice;
            existing.sellingPrice = drug.sellingPrice || existing.sellingPrice;
          } else {
            merged.push(drug);
          }
        });

        setInventory(merged);
        alert("Stock list successfully uploaded and merged!");
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Inventory Management
      </h2>

      {/* Upload CSV */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Upload CSV to Update Stock
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="border rounded-md p-2 w-full"
        />
      </div>

      {/* Add Drug Form */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <input
          name="drugName"
          placeholder="Drug Name"
          value={formData.drugName}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          name="costPrice"
          placeholder="Cost Price (₦)"
          type="number"
          value={formData.costPrice}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          name="markup"
          placeholder="Markup %"
          type="number"
          value={formData.markup}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          name="quantity"
          placeholder="Quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          name="packSize"
          placeholder="Pack Size"
          value={formData.packSize}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          name="expiry"
          placeholder="Expiry Date"
          type="date"
          value={formData.expiry}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <button
          onClick={handleAdd}
          className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
        >
          <PlusCircle className="w-5 h-5 mr-1" /> Add Drug
        </button>
      </div>

      {inventory.length > 0 && (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="p-2 border">Drug</th>
              <th className="p-2 border">Cost (₦)</th>
              <th className="p-2 border">Markup (%)</th>
              <th className="p-2 border">Selling Price (₦)</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Pack Size</th>
              <th className="p-2 border">Expiry</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((drug) => (
              <tr key={drug.id} className="hover:bg-gray-50">
                <td className="p-2 border">{drug.drugName}</td>
                <td className="p-2 border">{drug.costPrice}</td>
                <td className="p-2 border">{drug.markup}</td>
                <td className="p-2 border">
                  ₦{drug.sellingPrice.toFixed(2)}
                </td>
                <td className="p-2 border">{drug.stock}</td>
                <td className="p-2 border">{drug.packSize || "-"}</td>
                <td className="p-2 border">{drug.expiry || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryManagement;
