<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Spatie\Activitylog\Models\Activity; 

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        Activity::saving(function (Activity $activity) {
            // Gabungkan properti yang ada dengan IP dan User Agent
            $activity->properties = $activity->properties->merge([
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent() // (Opsional) Melacak browser/OS
            ]);
        });
    }
}
