import xml.etree.ElementTree as ET
import json
import sys

def xml_to_json(xml_file_path, json_file_path):
    # Charger le fichier XML
    tree = ET.parse(xml_file_path)
    root = tree.getroot()
    
    # Initialiser la structure de données JSON
    results_json = {
        "tests": []
    }
    
    # Extraire les informations de chaque testcase
    for testcase in root.findall('.//testcase'):
        test_result = {
            "name": testcase.get('name'),
            "time": testcase.get('time'),
            "status": "PASSED"
        }
        
        # Vérifier si le test a échoué
        failure = testcase.find('failure')
        if failure is not None:
            test_result["status"] = "FAILED"
            test_result["message"] = failure.get('message')
        
        results_json["tests"].append(test_result)
    
    # Écrire les résultats dans un fichier JSON
    with open(json_file_path, 'w') as json_file:
        json.dump(results_json, json_file, indent=4)

# Utiliser les arguments de ligne de commande pour les chemins de fichier
if len(sys.argv) != 3:
    print("Usage: python xml_to_json.py input.xml output.json")
else:
    xml_file_path = sys.argv[1]
    json_file_path = sys.argv[2]
    xml_to_json(xml_file_path, json_file_path)
