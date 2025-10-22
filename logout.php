<?php
session_start();

// تدمير جميع بيانات الجلسة
$_SESSION = array();

// إذا كنت تريد تدمير الجلسة تماماً، احذف كوكي الجلسة أيضاً
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// أخيراً، دمر الجلسة
session_destroy();

// توجيه المستخدم إلى صفحة Login
header("Location: ../login.html");
exit();
?>
