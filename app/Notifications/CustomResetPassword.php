<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPassword extends Notification
{
    use Queueable;

    public $token;

    // Terima token dari Laravel
    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        // Buat URL menuju halaman Reset Password React Anda
        $resetUrl = url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));

        return (new MailMessage)
            ->subject('Kunci Akses Baru - CMS Desa') // Judul Email
            // Gunakan view() alih-alih line() atau action() agar 100% custom HTML
            ->view('emails.lupa-sandi', [
                'user' => $notifiable,
                'resetUrl' => $resetUrl
            ]); 
    }
}