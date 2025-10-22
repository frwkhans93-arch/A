#!/bin/bash
# deploy.sh - سكريبت النشر التلقائي

echo "🚀 بدء نشر مكسبك انلاين..."

# نسخ الملفات إلى مجلد الخادم
sudo cp -r . /var/www/html/maksabk-online/

# تعديل الصلاحيات
sudo chown -R www-data:www-data /var/www/html/maksabk-online/
sudo chmod -R 755 /var/www/html/maksabk-online/

# إعادة تشغيل Apache
sudo systemctl restart apache2

echo "✅ تم النشر بنجاح!"
echo "🌐 عنوان الموقع: http://localhost/maksabk-online"
