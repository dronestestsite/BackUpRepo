<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Перевіряємо, чи форма була відправлена
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Отримуємо дані з полів форми
    $first_name = htmlspecialchars(trim($_POST['first_name']));
    $last_name = htmlspecialchars(trim($_POST['last_name']));
    $phone = htmlspecialchars(trim($_POST['phone']));

    // Перевіряємо, чи всі поля заповнені
    if (empty($first_name) || empty($last_name) || empty($phone)) {
        echo "Заповніть усі поля.";
        exit();
    }

    // Токен бота та chat_id
    $bot_token = '7769976872:AAGHMrgbDIfUp-dB8IC4Ns904sNbXEPB2Sg'; // Твій токен бота
    $chat_id = '7800011505'; // Заміни на свій chat_id

    // Формуємо текст повідомлення
    $message = "Ім'я: $first_name\nПрізвище: $last_name\nТелефон: $phone";

    // URL для Telegram API
    $url = "https://api.telegram.org/bot$bot_token/sendMessage";

    // Параметри запиту
    $data = [
        'chat_id' => $chat_id,
        'text' => $message,
        'parse_mode' => 'HTML' // Якщо потрібно форматування HTML
    ];

    // Відправка запиту
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ],
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    // Перевірка на помилки
    if ($result === FALSE) {
        echo "Помилка: " . error_get_last()['message'];
    } else {
        // Перенаправляємо на сторінку подяки
        header("Location: thankspage.html");
        exit();
    }
}
?>
