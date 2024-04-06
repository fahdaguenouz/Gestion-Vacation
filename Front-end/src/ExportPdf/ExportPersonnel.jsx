import React from 'react';
import { Page, Document, StyleSheet, Text } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import Amirifont from '../assets/Fonts/Amiri-Regular.ttf';

Font.register({
  family: 'Amiri',
  src: Amirifont,
});

// Define styles for the document
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Amiri', // Apply Amiri font to the entire page
    fontSize: 12,
  },
  arabicText: {
    fontFamily: 'Amiri',
    fontSize: 12,
  },
});

const generateHTMLContent = (personnel) => {
  let rows = personnel.map(item => `
    <tr>
      <td>${item.CodeDoti}</td>
      <td>${item.Cin}</td>
      <td>${item.LibelleFr}</td>
      <td>${item.LibelleAr}</td> <!-- Removed inline styles -->
      <td>${item.EtablissementLibelle}</td>
      <td>${item.GradesLibelle}</td>
      <td>${item.FonctionRoleLibelle}</td>
      <td>${item.MatiersLibelle}</td>
      <td>${item.Rib}</td>
      <td>${item.status}</td>
    </tr>
  `).join('');

  return `
    <div style="text-align: center;">
      <h1>Personnel Report</h1>
      <p>This report provides a comprehensive overview of the selected personnel items.</p>
      <table style="width: 100%;">
        <thead>
          <tr>
            <th>Code Doti</th>
            <th>CIN</th>
            <th>Name (FR)</th>
            <th>Libelle(AR)</th>
            <th>Etablissement</th>
            <th>Grade</th>
            <th>Fonction</th>
            <th>Matieres</th>
            <th>RIB</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
};

const ExportPersonnel = ({ personnel }) => {
  const htmlContent = generateHTMLContent(personnel);

  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4" style={styles.page}> 
            <Html>{htmlContent}</Html>
          </Page>
        </Document>
      }
      fileName="personnel-report.pdf"
    >
      {({ loading }) => (loading ? 'Loading document...' : 'Export as PDF')}
    </PDFDownloadLink>
  );
};

export default React.memo(ExportPersonnel);
