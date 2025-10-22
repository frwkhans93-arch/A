# منع الوصول المباشر إلى ملفات PHP الحساسة
<Files "config.php">
    Order Allow,Deny
    Deny from all
</Files>

<Files "create_admin.php">
    Order Allow,Deny
    Deny from all
</Files>

# إعادة التوجيه إلى HTTPS (إلغاء التعليق عند النشر)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# إعدادات UTF-8
AddDefaultCharset UTF-8

# منع عرض محتويات المجلدات
Options -Indexes

# تحسين الأداء
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 600 seconds"
</IfModule>
