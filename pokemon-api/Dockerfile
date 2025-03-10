FROM php:8.2-fpm

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN echo '{{"$schema":"https://getcomposer.org/schema.json","name":"laravel/laravel","type":"project","description":"The skeleton application for the Laravel framework.","keywords":["laravel","framework"],"license":"MIT","require":{"php":"^8.2","laravel/framework":"^12.0","laravel/sanctum":"^4.0","laravel/tinker":"^2.10.1"},"require-dev":{"fakerphp/faker":"^1.23","laravel/pail":"^1.2.2","laravel/pint":"^1.13","laravel/sail":"^1.41","mockery/mockery":"^1.6","nunomaduro/collision":"^8.6","phpunit/phpunit":"^11.5.3"},"autoload":{"psr-4":{"App\\":"app/","Database\\Factories\\":"database/factories/","Database\\Seeders\\":"database/seeders/"}},"autoload-dev":{"psr-4":{"Tests\\":"tests/"}},"scripts":{"post-autoload-dump":["Illuminate\\Foundation\\ComposerScripts::postAutoloadDump","@php artisan package:discover --ansi"],"post-update-cmd":["@php artisan vendor:publish --tag=laravel-assets --ansi --force"],"post-root-package-install":["@php -r \"file_exists('.env') || copy('.env.example', '.env');\""],"post-create-project-cmd":["@php artisan key:generate --ansi","@php -r \"file_exists('database/database.sqlite') || touch('database/database.sqlite');\"","@php artisan migrate --graceful --ansi"],"dev":["Composer\\Config::disableProcessTimeout","npx concurrently -c \"#93c5fd,#c4b5fd,#fdba74\" \"php artisan serve\" \"php artisan queue:listen --tries=1\" \"npm run dev\" --names='server,queue,vite'"]},"extra":{"laravel":{"dont-discover":[]}},"config":{"optimize-autoloader":true,"preferred-install":"dist","sort-packages":true,"allow-plugins":{"pestphp/pest-plugin":true,"php-http/discovery":true}},"minimum-stability":"stable","prefer-stable":true}}' > composer.json
# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar el directorio de trabajo
WORKDIR /var/www

# Copiar archivos de Laravel
COPY . .

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Ajustar permisos
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Exponer el puerto 9000 (usado por PHP-FPM)
EXPOSE 9000

# Comando por defecto
CMD ["php-fpm"]