import React from 'react';
import { Page, Document } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { PDFDownloadLink } from '@react-pdf/renderer';



// Assuming each item in the budget array has a description property
const generateHTMLContent = (budget) => {
  let rows = budget.map(item => `
    <tr>
      <td>${item.IdBudget}</td>
      <td>${item.IdTypePaiement}</td>
      <td>${item.Date}</td>
      <td>${item.anne}</td>
      <td>${item.ResteDuMontant}</td>
    </tr>
  `).join('');

  // Description of the selected items (modify as needed)
  const description = budget.map(item => `
    <p>Description for ${item.IdBudget}: ${item.IdTypePaiement}</p>
  `).join('');

  return `
    <div style="text-align: center;">
      <h1>Budget Report</h1>
      <p>This report provides a comprehensive overview of the selected budget items.</p>
      ${description}
      <table style="width: 100%;">
        <thead>
          <tr>
            <th>Code Budget</th>
            <th>Type de Paiement</th>
            <th>Date</th>
            <th>Anne</th>
            <th>Reste du Montant</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
};

const ExportBudget = ({ budget }) => {
  const htmlContent = generateHTMLContent(budget);
//   console.log('eeeeee');
// console.log(budget);
// console.log('eeeeee');

  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4">
            <Html>{htmlContent}</Html>
          </Page>
        </Document>
      }
      fileName="budget-report.pdf"
    >
      {({ loading }) => (loading ? 'Loading document...' : 'Export as PDF')}
    </PDFDownloadLink>
  );
};

export default React.memo(ExportBudget);

