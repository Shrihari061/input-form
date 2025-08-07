import { useState } from "react";

const documentTypes = [
  { label: "Balance Sheet", audited: true },
  { label: "Profit & Loss Statement", audited: true },
  { label: "Cash Flow Statement", audited: false },
  // { label: "Statement of Changes in Equity", audited: true },
  // { label: "ITR", audited: false },
  // { label: "Bank Statement", audited: false },
  // { label: "Provisional Financials", audited: false },
  // { label: "GST Return", audited: false },
  // { label: "Projected Financials", audited: false },
  // { label: "CMA", audited: false }
];

const years = ["2021", "2022", "2023", "2024", "2025"];

export default function Step2() {
  const [consent, setConsent] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});

  const handleFileChange = (docLabel: string, files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => ({
      ...prev,
      [docLabel]: prev[docLabel] ? [...prev[docLabel], ...newFiles] : newFiles,
    }));
  };

  const removeFile = (docLabel: string, index: number) => {
    setUploadedFiles((prev) => {
      const updated = [...(prev[docLabel] || [])];
      updated.splice(index, 1);
      return { ...prev, [docLabel]: updated };
    });
  };

  const removeAllFiles = (docLabel: string) => {
    setUploadedFiles((prev) => ({ ...prev, [docLabel]: [] }));
  };

  return (
    <div className="p-8 w-full">
      <h2 className="text-xl font-semibold mb-6">Step 2: Upload Financial Documents</h2>

      <div className="grid grid-cols-1 gap-6">
        {documentTypes.map((doc, idx) => (
          <div key={idx} className="border rounded p-6 bg-white shadow w-full">
            <label className="block text-base font-medium mb-2">{doc.label}</label>
            <input
              type="file"
              multiple
              className="mb-3 w-full cursor-pointer"
              onChange={(e) => handleFileChange(doc.label, e.target.files)}
            />

            {uploadedFiles[doc.label]?.length > 0 && (
              <div className="mb-3">
                <ul className="space-y-1 text-sm text-gray-700">
                  {uploadedFiles[doc.label].map((file, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded">
                      <span>{file.name}</span>
                      <button
                        onClick={() => removeFile(doc.label, index)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => removeAllFiles(doc.label)}
                  className="text-red-600 text-xs mt-2 hover:underline"
                >
                  Cancel All
                </button>
              </div>
            )}

            {doc.audited && (
              <div className="mb-3">
                <label className="text-sm font-medium mr-3">Auditor Verified:</label>
                <input type="checkbox" className="accent-blue-600" />
              </div>
            )}

            <div className="mb-1">
              <label className="text-sm font-medium mr-2">Financial Year:</label>
              <select className="border p-1 rounded">
                <option value="">Select</option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="mb-4">
          <label className="text-sm">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mr-2 accent-green-600"
            />
            I confirm that the documents submitted are accurate and verified.
          </label>
        </div>

        <button
          disabled={!consent}
          className={`px-6 py-2 rounded text-white ${
            consent ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit & Continue
        </button>
      </div>
    </div>
  );
}
