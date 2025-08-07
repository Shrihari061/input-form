import React, { useState, type ChangeEvent } from "react";

const Step3: React.FC = () => {
  const [declarations, setDeclarations] = useState({
    allDocumentsComplete: false,
    auditedSigned: false,
    financialsConsistent: false,
    identifiersValidated: false,
    cmaMatches: false,
    finalConfirmation: false,
  });

  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const handleCheckboxChange = (field: keyof typeof declarations) => {
    setDeclarations((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSignatureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSignatureFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted with data:", declarations, signatureFile);
    // Add your actual submission logic here
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Review & Declarations
      </h2>

      {/* Declaration Checkboxes */}
      <div className="space-y-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={declarations.allDocumentsComplete}
            onChange={() => handleCheckboxChange("allDocumentsComplete")}
          />
          <span className="text-gray-700">
            All documents are complete and accurate
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={declarations.auditedSigned}
            onChange={() => handleCheckboxChange("auditedSigned")}
          />
          <span className="text-gray-700">
            Audited financials are signed by a Chartered Accountant
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={declarations.financialsConsistent}
            onChange={() => handleCheckboxChange("financialsConsistent")}
          />
          <span className="text-gray-700">
            Financials are consistent across ITR, GST, and financial statements
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={declarations.identifiersValidated}
            onChange={() => handleCheckboxChange("identifiersValidated")}
          />
          <span className="text-gray-700">
            CIN, PAN, and GSTIN have been validated and are correct
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={declarations.cmaMatches}
            onChange={() => handleCheckboxChange("cmaMatches")}
          />
          <span className="text-gray-700">
            CMA data (if uploaded) is complete and matches projections
          </span>
        </label>
      </div>

      {/* Signature Upload */}
      <div className="pt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Signature of Authorised Signatory
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleSignatureUpload}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        {signatureFile && (
          <p className="text-sm text-green-600 mt-2">
            Selected: {signatureFile.name}
          </p>
        )}
      </div>

      {/* Final Declaration Checkbox */}
      <div className="pt-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={declarations.finalConfirmation}
            onChange={() => handleCheckboxChange("finalConfirmation")}
          />
          <span className="text-gray-700">
            I confirm that the above knowledge is true to the best of my knowledge
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3;
