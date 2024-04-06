import React from 'react';
import { Page, Document, Text, View, StyleSheet, Image, Font, PDFDownloadLink } from '@react-pdf/renderer';

// Assuming you have an image located in `src/assets/logoMEN-Sport-fr.png`
import logoMENSportFr from './/logoMEN-Sport-fr.png';

// Assuming Amirifont is correctly imported
import Amirifont from '../assets/Fonts/Amiri-Regular.ttf';

Font.register({
  family: 'Amiri',
  src: Amirifont,
});

const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4',
      padding: 10,
      fontSize:11,
      
    },
    section: {
      margin: '10px',
      padding: '10px',
      // flexGrow: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop:'20px',
      marginLeft:'20px',
      marginRight:'30px',
      
    },
    headerText: {
      width: '45%',
      textAlign: 'center',
      marginTop:'10px'
      // fontFamily: 'Amiri',
    },
    content: {
      margin: 10,
    },
    boldText: {
      fontFamily: 'Amiri',
      marginBottom: 10,
      fontWeight: 700,
      fontSize: 12,
    },
    TitleText:{
      fontWeight: 'bolder',
      border:'1.5px solid black',
      fontSize:15,
      fontWeight: 'bolder',
      margin: 20,
      padding: 10,
      borderRadius:8,
    },
    hr: {
      backgroundColor: 'black',
      height: 1,
      margin: 10,
      justifyContent: 'center',
    },
    text:{
      textAlign: 'center',
      
      marginTop:'10px',
    },
    Fouter:{
      display: 'flex',
      justifyContent:'left',
      margin:'auto',
      width:'50%',
      
    },
    textF:{
      textAlign:'right',
      
    },
    Exercice:{
      marginLeft: '80px',
    },
    paragraph:{
      marginTop: '10px',
      marginLeft:"10px",
      width:'90%'
    },
    soulignee:{
      textDecoration: 'underline',
      flexDirection: 'row',
      justifyContent: 'space-between',
      display:'flex',
      textAlign:'center',
      marginBottom: '80px',
      width: '100%',
    },
    textview:{
      width:'50%',

    },
    block:{
      display: 'block',
    },
    line:{
      borderTop:'2px solid black',
      width:'70%',
      margin:'auto',
      textAlign:'center',
    },
    fouterTitle:{
      textAlign:'center',
      textDecoration:'underline',
      marginTop:'20px',
      marginBottom:'20px',
      fontSize:15,
      fontWeight:'bold',
    },
    fouterContainer:{
      margin:'auto',
      width:'100%',
      textAlign:'center',
    },
    pay:{
      marginLeft: '10px',
      marginRight: '10px',
    },
    resultat:{
      fontSize:13,
      marginTop:'20px',
      fontWeight:'bold',
      width:'100%',
      textAlign:'center',
    },
    textToPay:{
      marginTop:'10px',

    }

  });

const ExportDashboard = ({data}) => {
  // console.log('########');
  // console.log(data);
  // console.log('########');

  const currentYear = new Date().getFullYear();
  const numberToWordsFrench = (number) => {
    let [integerPart, decimalPart] = parseFloat(number).toFixed(2).split('.').map(part => parseInt(part, 10));

    const units = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

    const convertUnits = (n) => units[n] || '';
    const convertTens = (n) => {
      if (n < 10) return convertUnits(n);
      else if (n >= 10 && n < 20) return teens[n - 10];
      else {
        let unit = n % 10;
        let ten = Math.floor(n / 10);
        // Adjusting for numbers in the 70-79 and 90-99 range
        if (n >= 70 && n < 80) {
            return `soixante-dix${unit ? '-' + convertUnits(unit) : ''}`;
        } else if (n >= 90 && n < 100) {
            return `quatre-vingt-${convertTens(n - 80)}`;
        } else {
            if (n % 10 === 0) return tens[ten];
            return `${tens[ten]}-${convertUnits(unit)}`;
        }
      }
    };
    const convertHundreds = (n) => {
      if (n < 100) return convertTens(n);
      else {
        let rest = n % 100;
        let hundred = Math.floor(n / 100);
        let prefix = hundred > 1 ? `${convertUnits(hundred)} cent` : 'cent';
        return rest !== 0 ? `${prefix} ${convertTens(rest)}` : prefix;
      }
    };
    const convertThousands = (n) => {
      if (n < 1000) return convertHundreds(n);
      else {
        let rest = n % 1000;
        let thousand = Math.floor(n / 1000);
        let prefix = thousand > 1 ? `${convertHundreds(thousand)} mille` : 'mille';
        return rest !== 0 ? `${prefix} ${convertHundreds(rest)}` : prefix;
      }
    };

    let result = `${convertThousands(integerPart)} Dirham${integerPart > 1 ? 's' : ''}`;
    if (decimalPart > 0) {
        // Ensuring decimal part is correctly converted, especially for values like 92 becoming "quatre-vingt-douze"
        result += ` et ${convertTens(decimalPart)} centime${decimalPart > 1 ? 's' : ''}`;
    }
    return result;
};
  
  // Calculate the total amount due for the copies corrected
  const totalAmount = data.CopieCorriger * data.prixDeCopie;


  // Calculate the IR (Income Tax) as a percentage of the total amount
  const IR = (data.CopieCorriger * data.prixDeCopie * data.taux) / 100;

  // Calculate the net amount payable after deducting the IR
  const netAmount = parseFloat( (totalAmount - IR).toFixed(2));
  const netAmountInWords = numberToWordsFrench(netAmount);
  return(

  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.header1}>
        <Image src={logoMENSportFr} style={{ width: 250}} />
        <Text style={styles.headerText}>Académie regionale D'education et de Formation Région de l'oriental</Text>
        </View>
        <View style={styles.Exercice}>
        <Text style={{ marginLeft:'10px' }}>Exercice: {currentYear}</Text>
        <Text>Imputation:</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.TitleText}>Etat des sommes dues pour frais de correction n° :</Text>
        <Text style={styles.paragraph}>
          Application de l'arrêté n°2.08.370 du 30 Chawal 1429 (30 octobre 2008) relatif aux vacations allouées au membres
          du jury des concours et examens de l'enseignement fondamental et de l'orientation fixant le taux de correction des
          épreuves écrites des examens du cycle ({data.niveau}) à  ({data.prixDeCopie}) Dhs la copie corrigée.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.boldText}>Je soussigné: {data.personnelName}</Text>
        <Text style={styles.boldText}>DOTI: {data.codeDoti}</Text>
        <Text style={styles.boldText}>Grade: {data.grade}</Text>
        <Text style={styles.boldText}>Affectation: {data.etablissementName}  Direction Berkane</Text>
        <Text style={styles.text}>Déclare avoir c orrigé {data.prixDeCopie} copies concernant les épreuves écrites des examens 2023</Text>
      </View>
      <View style={styles.soulignee}>
       <View style={styles.textview}> <Text style={styles.textS}>Le déclarant :</Text></View>
        <View style={styles.textview}><Text style={styles.textS}>Vu,vérifié et cértifié exacte </Text>
        <Text style={styles.block}>Berkane le:</Text>
        </View>
      </View>
      <View>
        <Text style={styles.line}></Text>
        <Text style={styles.fouterTitle}>Décompte des Sommes dues</Text>
        <View style={styles.fouterContainer}>
        <View style={styles.textToPay}>
          <Text > {data.CopieCorriger} <Text style={styles.pay}>  copies x {data.prixDeCopie} = </Text><Text>{totalAmount} Dirhams</Text></Text>
        </View>
        <View style={styles.textToPay}>
        <Text > IR 
          <Text style={styles.pay}>  {data.taux} % </Text>
          <Text style={{ marginLeft:'12px'}}> {IR} Dirhams </Text>
          </Text>
          
        </View>
        <View style={styles.textToPay}>
        <Text style={styles.pay}> Net =
          <Text style={{ marginLeft:'10px'}}> {netAmount} Dirhams </Text>
          </Text>
        </View>
        </View>
        <View style={styles.resultat}>
          <Text style={{ marginTop:'20px' }}>Arrété par nous,Sous-Ordonnateur a la somme de :</Text>
          <Text style={{ marginTop:'10px' }}>{netAmountInWords} </Text>
        </View>
      </View>
      <View style={styles.Fouter}>
        <Text style={styles.textF}>Berkane le:</Text>
        <Text style={styles.textF}>Le Sous-Ordonnateur:</Text>
      </View>
    </Page>
  </Document>
  )

  }


export default ExportDashboard;
