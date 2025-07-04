<?php

// Permitir requisições vindas do localhost:3000
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (!isset($_GET['runId'])) {
    http_response_code(400);
    echo json_encode(['approved' => false, 'error' => 'runId não fornecido.']);
    exit;
}

$runId = $_GET['runId'];

$apiUrl = "http://localhost:3000/api/run/get?id=" . urlencode($runId);
$jsonData = @file_get_contents($apiUrl);

// echo "API URL: " . $apiUrl . "\n"; // Debugging line
// echo "JSON Data: " . $jsonData . "\n"; // Debugging line

if ($jsonData === false) {
    http_response_code(500);
    echo json_encode(['approved' => false, 'error' => 'Falha ao buscar dados da run. A API está de pé?']);
    exit;
}

$data = json_decode($jsonData);

$userCodeFilePath = 'temp_user_script.py';

$userCodeUrl = $data->run->fileUrl;

$userCode = @file_get_contents($userCodeUrl);

if ($userCode === false) {
    http_response_code(500);
    echo json_encode(['approved' => false, 'error' => 'Falha ao baixar o arquivo de código do usuário. URL: ' . $userCodeUrl]);
    exit;
}

file_put_contents($userCodeFilePath, $userCode);

$testCases = $data->run->challenge->testCases;

foreach ($testCases as $index => $testCase) {
    $input = $testCase->input;
    $expectedOutput = $testCase->expectedOutput;

    $command = 'python ' . $userCodeFilePath;

    $command .= ' ' . $input;

    // echo $command . "\n";

    $output = shell_exec($command); 
    $output = trim($output);

    // echo $output . ' === ' . $expectedOutput . "\n";

    if ($output !== $expectedOutput) {
        $allTestsPassed = false;
        break;
    }

    $allTestsPassed = true;
}

unlink($userCodeFilePath);

header('Content-Type: application/json');
echo json_encode(['approved' => $allTestsPassed, 'runId' => (int)$runId]);
?>