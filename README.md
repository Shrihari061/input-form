# CLOS - Company Loan Origination System

A React-based web application for managing company loan origination processes with multi-step form functionality.

## Features

### Step 1: Company Info & AML Check
- **CIN Verification**: Enter and validate Company Identification Numbers
- **Company Details**: Auto-populate company information from CIN
- **Director Details**: Display director information
- **AML Status**: Real-time AML (Anti-Money Laundering) status checking
- **Contact Information**: 
  - Contact Person dropdown with auto-populating phone numbers
  - Designation selection (RM/BM)
  - Loan type and amount fields

### Step 2: Document Upload
- Upload financial documents (Balance Sheet, P&L, Cash Flow)
- Multiple file upload support
- Auditor verification checkboxes

### Step 3: Review & Submit
- Final review of all submitted information
- Declaration checkboxes
- Digital signature upload

## Recent Updates

### Enhanced Contact Person Management
- **Designation Field**: Changed from "Assign RM" to "Designation" with RM/BM options
- **Contact Person Dropdown**: Converted from text input to dropdown with hardcoded values
- **Auto-Population**: Phone numbers automatically populate when selecting a contact person
- **Hardcoded Contact List**: Includes both Indian and international contact persons

### Contact Person List
- Ashwini Shekhawat (+91-98765-43210)
- Sarah Johnson (+1-555-0123)
- Shrihari Rao (+91-87654-32109)
- Emily Davis (+1-555-0124)
- Rajesh Kumar (+91-76543-21098)
- Lisa Anderson (+1-555-0125)
- Robert Taylor (+1-555-0126)
- Jennifer Martinez (+1-555-0127)
- David Schwimmer (+1-555-0128)
- Monica Geller (+1-555-0129)
- Phoebe Buffay (+1-555-0130)
- Joey Tribbiani (+1-555-0131)
- Chandler Bing (+1-555-0132)
- Rachel Green (+1-555-0133)

## Technology Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **Package Manager**: npm

## Getting Started

### Prerequisites
- Node.js (v22.16.0 or higher)
- npm (v11.5.1 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shrihari061/input-form.git
cd input-form
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── pages/
│   ├── Step1.tsx        # Company Info & AML Check
│   ├── Step2.tsx        # Document Upload
│   └── Step3.tsx        # Review & Submit
├── assets/              # Static assets
└── index.css            # Global styles
```

## Development Notes

- The application uses mock data for CIN validation and AML checks
- Contact person data is currently hardcoded but designed for easy database integration
- Phone number auto-population works based on contact person selection
- All form fields are properly typed with TypeScript interfaces

## Future Enhancements

- Database integration for contact person management
- Real CIN validation API integration
- Actual AML checking service integration
- File upload to cloud storage
- User authentication and authorization
- Admin dashboard for managing applications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.
