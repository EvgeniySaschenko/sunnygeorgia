<?php
/**
 * Created by PhpStorm.
 * User: nitog_000
 * Date: 02.06.14
 * Time: 15:34
 */
if ($_POST) {

    $msg = array();
    foreach ($_POST as $key => $value) {
        //сначала делаем обработку
        $value = trim($value); // убираем пробелы в начале и в конце переменной.
        if (get_magic_quotes_gpc()) $value = stripslashes($value); //убираем слеши, если надо
        $value = htmlspecialchars($value, ENT_QUOTES); //заменяем служебные символы HTML на эквиваленты
        $_POST[$key] = $value; //все изменения записываем в массив $_POST
        //дальше делаем изменения, которые пойдут только в файл,
        //а в форму их выводить не нужно.
        $value = str_replace("\r", "", $value); // заменяем все переводы строк
        $value = str_replace("\n", "<br>", $value); //на <br>
        $msg[$key] = $value; //и присваиваем новые значения элементам массива $msg.
    }

    require 'PHPMailer/PHPMailerAutoload.php';

    $mail = new PHPMailer;

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'x*x';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'x*x';                 // SMTP username
    $mail->Password = 'x*x';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable encryption, 'ssl' also accepted
    $mail->Port = 465;

    //    $mail->isSendmail();
    $mail->CharSet = 'UTF-8';
    $mail->From = 'noreply@sunnygeorgia.travel';
    $mail->addAddress('info@sunnygeorgia.travel'); // Add a recipient

    $mail->WordWrap = 50; // Set word wrap to 50 characters

    $mail->isHTML(true); // Set email format to HTML

    $mail->Subject = 'Sunnygeorgia Vodopad Landing';
    $mail->Body = '';
    $mail->AltBody = '';
    // $mail->Body = '<p>Project name: ' . $msg['project_name'] . '</p>
    //                <p>Form subject: ' . $msg['form_subject'] . '</p>
    //                <p>Name: ' . $msg['name'] . '</p>
    //                <p>Phone: ' . $msg['phone'] . '</p>
    //                <p>Email: ' . $msg['email'] . '</p>';

    foreach ($msg as $key => $value) {
        $mail->Body .= "<p>$key: $value</p>";
    }
    foreach ($msg as $key => $value) {
        $mail->AltBody .= "$key: $value\r\n";
    }

    if (!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}