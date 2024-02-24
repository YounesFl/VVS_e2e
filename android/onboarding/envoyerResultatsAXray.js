// const fs = require('fs');
// const axios = require('axios');
// const xml2js = require('xml2js');
// const parser = new xml2js.Parser();

// const xrayApiToken = 'ton_token_jwt';
// const xrayApiUrl = 'https://xray.cloud.getxray.app/api/v2/import/execution';
// const xmlFilePath = 'path/to/your/test-report.xml';

// fs.readFile(xmlFilePath, (err, data) => {
//     if (err) {
//         console.error('Erreur lors de la lecture du fichier XML:', err);
//         return;
//     }

//     parser.parseString(data, (err, result) => {
//         if (err) {
//             console.error('Erreur lors de la conversion XML en JSON:', err);
//             return;
//         }

//         // Adaptation des données au format attendu par Xray
//         const xrayData = {
//             testExecutionKey: "ID_de_l'execution", // Remplacer par l'ID réel de l'exécution
//             tests: []
//         };

//         result.testsuites.testsuite.forEach(suite => {
//             suite.testcase.forEach(test => {
//                 xrayData.tests.push({
//                     testKey: test.$.id,
//                     start: "Date_de_debut", // Adapter selon le besoin
//                     finish: "Date_de_fin", // Adapter selon le besoin
//                     comment: "Commentaire sur le test",
//                     status: test.$.failures === "0" ? "PASSED" : "FAILED"
//                 });
//             });
//         });

//         // Envoi des données à Xray
//         axios.post(xrayApiUrl, xrayData, { 
//             headers: {
//                 'Authorization': `Bearer ${xrayApiToken}`,
//                 'Content-Type': 'application/json'
//             } 
//         })
//         .then(response => console.log('Succès:', response.data))
//         .catch(error => console.error('Erreur lors de l\'envoi à Xray:', error.response ? error.response.data : error));
//     });
// });

const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

// Chemin vers ton fichier XML de résultats de test
const xmlFilePath = '/Users/youneszaroual/Desktop/test/e2e/onboarding/report.xml';

fs.readFile(xmlFilePath, (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier XML:', err);
        return;
    }
    
    parser.parseString(data, (err, result) => {
        if (err) {
            console.error('Erreur lors de la conversion XML en JSON:', err);
            return;
        }
        
        // Affichage du résultat de la conversion pour vérification
        console.log(JSON.stringify(result, null, 2));

        // Traitement des données du JSON converti
        const testsuites = result.testsuites.testsuite;
        
        testsuites.forEach((suite) => {
            console.log(`Nom de la suite de test: ${suite.$.name}`);
            console.log(`Device: ${suite.$.device}`);
            console.log(`Nombre de tests: ${suite.$.tests}`);
            console.log(`Échecs: ${suite.$.failures}`);
            console.log(`Durée totale: ${suite.$.time} secondes`);
            
            suite.testcase.forEach((testcase) => {
                console.log(`ID du cas de test: ${testcase.$.id}`);
                console.log(`Nom du cas de test: ${testcase.$.name}`);
                console.log(`Classe du cas de test: ${testcase.$.classname}`);
                console.log(`Durée du cas de test: ${testcase.$.time}`);
            });
        });
    });
});
