// js/dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // تحديث الإحصائيات عند التحميل
    updateStats();
    
    // إضافة تأثيرات للبطاقات
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// دالة إكمال المهمة
async function completeTask(taskId) {
    try {
        const response = await fetch('php/complete_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_id: taskId,
                user_id: getUserId()
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // تحديث النقاط في الواجهة
            updatePoints(data.new_points);
            
            // إظهار إشعار النجاح
            showNotification(🎉 مبروك! ربحت ${data.points_earned} نقطة, 'success');
            
            // تحديث الإحصائيات
            updateStats();
            
        } else {
            showNotification('❌ ' + data.message, 'error');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('❌ حدث خطأ في النظام', 'error');
    }
}

// تحديث النقاط
function updatePoints(newPoints) {
    const pointsElement = document.querySelector('.points');
    if (pointsElement) {
        pointsElement.textContent = newPoints;
    }
}

// إظهار الإشعارات
function showNotification(message, type) {
    // إنصراف عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = notification ${type};
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else {
        notification.style.background = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// الحصول على ID المستخدم
function getUserId() {
    // يمكن تخزين ID المستخدم في متغير JavaScript أو الحصوله من السيرفر
    return document.body.getAttribute('data-user-id') || 1;
}

// تحديث الإحصائيات
async function updateStats() {
    try {
        const response = await fetch('php/get_stats.php');
        const stats = await response.json();
        
        // تحديث عناصر الإحصائيات
        document.querySelectorAll('.stat-value').forEach((element, index) => {
            const values = Object.values(stats);
            if (values[index] !== undefined) {
                element.textContent = values[index];
            }
        });
        
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// إضافة أنيميشن للإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
