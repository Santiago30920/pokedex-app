# Usar PHP-FPM 8.2 como base
FROM php:8.2-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir el directorio de trabajo
WORKDIR /var/www

# Copiar archivos clave primero para aprovechar la caché de Docker
COPY composer.json composer.lock ./

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Copiar el resto de archivos del proyecto
COPY . .

# Ajustar permisos para almacenamiento y caché
RUN chmod -R 775 storage bootstrap/cache && \
    chown -R www-data:www-data storage bootstrap/cache

# Generar clave de aplicación
RUN php artisan key:generate

# Exponer el puerto
EXPOSE 9000

# Comando de inicio
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9000"]
