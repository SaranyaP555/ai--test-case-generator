# AI Test Case Generator

A modern web application that generates comprehensive test cases from Product Requirements Documents (PRDs) using AI-powered logic.

## Features

- **AI-Powered Generation**: Intelligently creates test cases based on PRD content
- **Multiple Test Types**: Supports Functional, Integration, Regression, Smoke, UAT, Performance, Security, and Usability testing
- **Customizable Output**: Choose the number of test cases to generate (1-50)
- **Editable Results**: All generated test cases are fully editable inline
- **Multiple Export Formats**: Export to Excel (.xlsx), CSV, and PDF
- **Responsive Design**: Works on desktop and mobile devices
- **Attractive UI**: Modern, gradient-based design with smooth animations

## Quick Start

### Option 1: Using Python (No installation required)
```bash
cd ai-testcase-generator
python -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Option 2: Using Node.js
```bash
cd ai-testcase-generator
npm install
npm start
```
Then open http://localhost:8000 in your browser.

### Option 3: Direct File Access
Simply open `index.html` in your web browser.

## Deployment

### Netlify
1. Drag and drop the `ai-testcase-generator` folder to Netlify
2. Your app will be live instantly

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch and save
4. Access at `https://[username].github.io/[repository-name]`

## Usage

1. Paste your PRD in the text area
2. Select the test case type from the dropdown
3. Choose the number of test cases to generate
4. Click "Generate Test Cases"
5. Edit any generated content by clicking on table cells
6. Export to your preferred format

## Technologies Used

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript
- SheetJS (XLSX export)
- jsPDF (PDF export)
- Font Awesome (icons)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License