<?php

// error_reporting(0); // Remova durante debug

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (!isset($_GET['runId'])) {
    http_response_code(400);
    echo json_encode(['approved' => false, 'error' => 'runId não fornecido.']);
    exit;
}

$runId = $_GET['runId'];
$apiBaseUrl = getenv('API_BASE_URL') . '/';
// $apiBaseUrl = 'http://localhost:3030/'; // Defina o URL base da API aqui
// echo "API Base URL: " . $apiBaseUrl . "</br>";

if (!$apiBaseUrl) {
    http_response_code(500);
    echo json_encode(['approved' => false, 'error' => 'Variável de ambiente API_BASE_URL não definida.']);
    exit;
}

$apiUrl = $apiBaseUrl . "run/" . urlencode($runId);
// echo "API URL: " . $apiUrl . "</br>";
$jsonData = @file_get_contents($apiUrl);

// echo "JSON Data: " . $jsonData . "</br>";

if ($jsonData === false) {
    http_response_code(500);
    exit;
}

// echo "JSON Data: " . $jsonData . "</br>";

$data = json_decode($jsonData);
$userCodeFilePath = 'temp_user_script.py';
$userCodeUrl = $data->fileUrl;
$userCode = @file_get_contents($userCodeUrl);

if ($userCode === false) {
    http_response_code(500);
    echo json_encode(['approved' => false, 'error' => 'Falha ao baixar código. URL: ' . $userCodeUrl]);
    exit;
}

file_put_contents($userCodeFilePath, $userCode);

$testCases = $data->challenge->testCases;
$receivedOutputs = [];
$allTestsPassed = false;
$error = null;

foreach ($testCases as $index => $testCase) {
    $input = $testCase->input;
    $expectedOutput = $testCase->expectedOutput;

    $command = 'python3 ' . $userCodeFilePath;
    $descriptorspec = [
       0 => ["pipe", "r"],
       1 => ["pipe", "w"],
       2 => ["pipe", "w"]
    ];

    $process = proc_open($command, $descriptorspec, $pipes);

    if (is_resource($process)) {
        fwrite($pipes[0], $input);
        fclose($pipes[0]);

        $output = stream_get_contents($pipes[1]);
        fclose($pipes[1]);

        $errorOutput = stream_get_contents($pipes[2]);
        fclose($pipes[2]);

        if (!empty($errorOutput)) {
            // echo "[stderr] | Erro: " . nl2br($errorOutput) . "</br>";
            $error = $errorOutput;
        }

        if (trim($output) === '') {
            // echo "[Aviso] | Nenhuma saída produzida pelo script Python.</br>";
            $error = "Nenhuma saída produzida pelo script Python.";
        }

        proc_close($process);
    }

    $canonical_output = trim(preg_replace('/\s+/', ' ', $output));
    $temp_expected = str_replace('\\n', ' ', $expectedOutput);
    $canonical_expected = trim(preg_replace('/\s+/', ' ', $temp_expected));

    $receivedOutputs[] = $canonical_output;

    if (strcasecmp($canonical_output, $canonical_expected) !== 0) {
        $allTestsPassed = false;
        break;
    }
    $allTestsPassed = true;
}

unlink($userCodeFilePath);

header('Content-Type: application/json');
echo json_encode([
    'approved' => $allTestsPassed,
    'runId' => (int)$runId,
    'testCasesResults' => $receivedOutputs,
    'error' => $error ? $error : null,
]);
