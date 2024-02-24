#!/bin/bash

# Chemins complets vers les fichiers de test Maestro
# TEST1="/Users/youneszaroual/Desktop/test/e2e/registration/Information/indicatif.yaml"
TEST2="/Users/youneszaroual/Desktop/test_automotion/vvs_test/e2e/android/registration/inscription/inscription.yaml"

# Chemin du dossier où sauvegarder les résultats des tests
RESULTS_DIR="/Users/youneszaroual/Desktop/test_automotion/vvs_test/e2e/results"
mkdir -p "$RESULTS_DIR"  # Crée le dossier s'il n'existe pas

# Exécuter le Test 1 et sauvegarder les résultats
#echo "Exécution du Test 1: Information/Indicatif"
#maestro test --format junit "$TEST1" > "$RESULTS_DIR/test1_results.xml"
#echo "Test 1 terminé et résultats sauvegardés dans $RESULTS_DIR/test1_results.xml."

# Exécuter le Test 2 et sauvegarder les résultats
echo "Exécution du Test 2: Inscription"
#touch "$RESULTS_DIR/test2_results.xml"
maestro test --format junit "$TEST2" --output "$RESULTS_DIR/test2_results.xml"
echo "Test 2 terminé et résultats sauvegardés dans $RESULTS_DIR/test2_results.xml."

python3 xml_to_json.py "$RESULTS_DIR/test2_results.xml" data.json

curl -H "Content-Type: application/json" -X POST -H "Authorization: Bearer $ATATT3xFfGF0dqk8eWKaojG0GYVQfdimEpaBacF5Ocyi-QtNwzfyc0PauM7d1CAXZ4pMfYGXckew0AqVfNLXRHwFyB7dAit5cTp31CPBr83ODYMhU9uvCV9ut1GNtUv4gZsvMIQn_vaSeM_KbBg_3f3N5UzkoGFX_KTO_4V304BsdEbZFD2oozk=3DE163DF" --data @"data.json" https://xray.cloud.getxray.app/api/v2/import/execution
echo "Tous les tests ont été exécutés."



# cd /Users/youneszaroual/Desktop/test/e2e/
# chmod +x run_maestro_tests.sh
# ./run_maestro_tests.sh
