<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::resource('companies', CompanyController::class);

Route::resource('products', ProductController::class);
Route::resource('drivers', DriverController::class);


//Route::resource('vehicles', VehicleController::class);
Route::prefix('vehicles')->name('vehicles.')->controller(VehicleController::class)->group(function(){
    Route::get('/', 'index')->name('index');
    Route::post('/', 'store')->name('store');
    Route::get('/create/{type}', 'create')->name('create');
    Route::get('/{vehicle}', 'show')->name('show');
    Route::put('/{vehicle}', 'update')->name('update');
    Route::DELETE('/{vehicle}', 'destroy')->name('destroy');
    Route::get('/{vehicle}/edit', 'edit')->name('edit');







});


require __DIR__.'/auth.php';

