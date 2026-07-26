<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reset Kata Sandi</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7f6; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2563eb; padding: 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">CMS DESA TERPADU</h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px; color: #333333; line-height: 1.6; font-size: 16px;">
                            <p style="margin-top: 0;">Halo, <strong>{{ $user->name }}</strong>,</p>
                            
                            <p>Seseorang (semoga saja Anda) telah meminta untuk mengatur ulang kata sandi akun Administrator Anda.</p>
                            
                            <p>Silakan klik tombol di bawah ini untuk membuat kata sandi baru. Tautan ini hanya berlaku selama <strong>60 menit</strong>.</p>
                            
                            <div style="text-align: center; margin: 35px 0;">
                                <a href="{{ $resetUrl }}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                                    Buat Sandi Baru
                                </a>
                            </div>

                            <p style="color: #666666; font-size: 14px;">
                                Jika Anda tidak pernah meminta pengaturan ulang ini, abaikan saja email ini. Akun Anda tetap aman.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #eeeeee;">
                            <p style="margin: 0;">&copy; {{ date('Y') }} Sistem Informasi Desa. Semua hak dilindungi.</p>
                            <p style="margin: 5px 0 0 0;">Email ini dikirim secara otomatis, mohon tidak membalas email ini.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>