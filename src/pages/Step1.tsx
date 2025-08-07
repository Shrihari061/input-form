import React, { useState } from 'react';

const steps = ['Company Info & AML', 'Document Upload', 'Final Review'];

export default function Step1() {
  const [cin, setCIN] = useState('');
  const [cinValid, setCinValid] = useState<boolean | null>(null);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [directorDetails, setDirectorDetails] = useState<any[]>([]);

  const [amlCompanyStatus, setAmlCompanyStatus] = useState<'idle' | 'initiated' | 'pending' | 'done' | 'failed'>('idle');
  const [amlDirectorStatus, setAmlDirectorStatus] = useState<'idle' | 'initiated' | 'pending' | 'done' | 'failed'>('idle');

  const [availableRMs] = useState<string[]>(['RM1', 'RM2', 'RM3']); // Mock RM list

  const handleCINChange = (value: string) => {
    setCIN(value);
    setCinValid(null);
    setCompanyDetails(null);
    setDirectorDetails([]);
    setAmlCompanyStatus('idle');
    setAmlDirectorStatus('idle');
  };

  const validateCIN = () => {
    const regex = /^[A-Z][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
    const isValid = regex.test(cin);
    setCinValid(isValid);
    if (!isValid) return;

    // Mocked Data
    const mockData = {
      company: {
        name: 'Acme Tech Solutions Pvt Ltd',
        registrationNo: cin,
        incorporatedDate: '12-05-2021',
        email: 'contact@acmetech.com',
        address: {
          line1: '1234 Tech Park Lane',
          city: 'Bengaluru',
          state: 'Karnataka',
          country: 'India',
        },
      },
      directors: [
        { din: '10020030', firstName: 'Ravi', lastName: 'Sharma' },
        { din: '20030040', firstName: 'Priya', lastName: 'Kumar' },
      ],
    };

    setCompanyDetails(mockData.company);
    setDirectorDetails(mockData.directors);

    // Simulate AML Statuses
    startAMLCheckForCompany(mockData.company.name);

    const incorporatedYear = parseInt(mockData.company.incorporatedDate.split('-')[2], 10);
    if (new Date().getFullYear() - incorporatedYear < 5) {
      startAMLCheckForDirectors(mockData.directors);
    }
  };

  const startAMLCheckForCompany = (companyName: string) => {
    setAmlCompanyStatus('initiated');
    setTimeout(() => setAmlCompanyStatus('pending'), 1000);
    setTimeout(() => {
      const passed = Math.random() > 0.1;
      setAmlCompanyStatus(passed ? 'done' : 'failed');
    }, 2500);
  };

  const startAMLCheckForDirectors = (directors: any[]) => {
    setAmlDirectorStatus('initiated');
    setTimeout(() => setAmlDirectorStatus('pending'), 1000);
    setTimeout(() => {
      const passed = Math.random() > 0.1;
      setAmlDirectorStatus(passed ? 'done' : 'failed');
    }, 3000);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Company Info & AML Check</h1>

      {/* CIN Entry */}
      <div className="mb-6 flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">CIN Number</label>
          <input
            value={cin}
            onChange={(e) => handleCINChange(e.target.value)}
            className="w-full border px-3 py-2 rounded shadow-sm"
            placeholder="Enter CIN"
          />
        </div>
        <button
          onClick={validateCIN}
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
        >
          Verify CIN
        </button>
        {cinValid !== null && (
          <span className="text-sm font-semibold">
            {cinValid ? (
              <span className="text-green-600">✓ Valid</span>
            ) : (
              <span className="text-red-600">✗ Invalid</span>
            )}
          </span>
        )}
      </div>

      {/* Company Details */}
      {companyDetails && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium">Company Name</label>
            <input value={companyDetails.name} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          </div>
          <div>
            <label className="text-sm font-medium">CIN</label>
            <input value={companyDetails.registrationNo} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          </div>
          <div>
            <label className="text-sm font-medium">Incorporation Date</label>
            <input value={companyDetails.incorporatedDate} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input value={companyDetails.email} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium">Address</label>
            <input
              value={`${companyDetails.address.line1}, ${companyDetails.address.city}, ${companyDetails.address.state}`}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
        </div>
      )}

      {/* Director Details */}
      {directorDetails.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-md mb-3">Director Details</h3>
          <div className="space-y-2">
            {directorDetails.map((d, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">DIN</label>
                  <input value={d.din} readOnly className="w-full border px-2 py-1 rounded bg-gray-100" />
                </div>
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input value={d.firstName} readOnly className="w-full border px-2 py-1 rounded bg-gray-100" />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input value={d.lastName} readOnly className="w-full border px-2 py-1 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AML Status */}
      {(amlCompanyStatus !== 'idle' || amlDirectorStatus !== 'idle') && (
        <div className="mb-6 space-y-1 text-sm">
          {amlCompanyStatus !== 'idle' && (
            <div>
              Company AML:{" "}
              <span
                className={`font-semibold ${
                  amlCompanyStatus === 'done'
                    ? 'text-green-600'
                    : amlCompanyStatus === 'failed'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                {amlCompanyStatus.toUpperCase()}
              </span>
            </div>
          )}
          {amlDirectorStatus !== 'idle' && (
            <div>
              Director AML:{" "}
              <span
                className={`font-semibold ${
                  amlDirectorStatus === 'done'
                    ? 'text-green-600'
                    : amlDirectorStatus === 'failed'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                {amlDirectorStatus.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Manual Entry Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Contact Person</label>
          <input className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <input className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="text-sm font-medium">Loan Type</label>
          <select className="w-full border px-3 py-2 rounded">
            <option>Term Loan</option>
            <option>OD/CC</option>
            <option>LC</option>
            <option>BG</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Loan Amount</label>
          <input type="number" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="text-sm font-medium">Assign RM</label>
          <select className="w-full border px-3 py-2 rounded">
            {availableRMs.map((rm) => (
              <option key={rm}>{rm}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Save & Continue */}
      <div className="mt-8">
        <button
          disabled={amlCompanyStatus !== 'done' || (amlDirectorStatus && amlDirectorStatus !== 'done')}
          className="bg-green-600 text-white px-6 py-2 rounded shadow disabled:bg-gray-400"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
