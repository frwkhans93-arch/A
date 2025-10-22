<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'غير مصرح']);
    exit();
}

$user_id = $_SESSION['user_id'];

try {
    // عدد المهام المكتملة
    $completed_sql = "SELECT COUNT(*) as completed_count FROM user_tasks WHERE user_id = ? AND status = 'completed'";
    $completed_stmt = $pdo->prepare($completed_sql);
    $completed_stmt->execute([$user_id]);
    $completed_count = $completed_stmt->fetch(PDO::FETCH_ASSOC)['completed_count'];
    
    // إجمالي النقاط المسحوبة
    $withdrawn_sql = "SELECT COALESCE(SUM(points_used), 0) as total_withdrawn FROM withdrawal_requests WHERE user_id = ? AND status IN ('approved', 'paid')";
    $withdrawn_stmt = $pdo->prepare($withdrawn_sql);
    $withdrawn_stmt->execute([$user_id]);
    $total_withdrawn = $withdrawn_stmt->fetch(PDO::FETCH_ASSOC)['total_withdrawn'];
    
    // النقاط المتاحة (من الجلسة)
    $current_points = $_SESSION['points'];
    
    echo json_encode([
        'current_points' => $current_points,
        'total_withdrawn' => $total_withdrawn,
        'completed_count' => $completed_count
    ]);
    
} catch(PDOException $e) {
    echo json_encode(['error' => 'خطأ في جلب البيانات']);
}
?>
