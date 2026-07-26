<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Arial', sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #2563eb, #4f46e5); padding: 30px; text-align: center; color: white; }
        .content { padding: 30px; color: #374151; line-height: 1.6; }
        .btn { display: inline-block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>CMS Desa Terpadu</h2>
        </div>
        <div class="content">
            <p>Halo, <strong>{{ $user->name }}</strong>!</p>
            <p>Kami menerima permintaan untuk mengatur ulang kata sandi akun administrator Anda. Klik tombol di bawah ini untuk melanjutkan:</p>
            
            <div style="text-align: center;">
                <a href="{{ $resetUrl }}" class="btn">Atur Ulang Kata Sandi</a>
            </div>

            <p style="font-size: 13px; color: #6b7280; margin-top: 30px;">
                Jika Anda merasa tidak melakukan permintaan ini, abaikan saja email ini. Tautan ini akan kedaluwarsa dalam 60 menit.
            </p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Pemerintahan Desa. Hak cipta dilindungi.
        </div>
    </div>
</body>
</html>