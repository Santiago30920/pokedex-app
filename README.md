Proyecto PocketDeck

Este proyecto utiliza Laravel como API y Angular para el frontend. A continuación, se detallan los pasos para la instalación y configuración del entorno de desarrollo.

Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

PHP 8.0 o superior

Composer

PostgreSQL

Node.js y npm

Angular CLI

Instalación del Backend (Laravel)

Clona el repositorio:

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

Instala las dependencias de Laravel:

composer install

Crea el archivo de configuración .env y establece la conexión con la base de datos PostgreSQL:

cp .env.example .env

Configura la base de datos en .env:

DB_CONNECTION=pgsql
DB_HOST=postgres.local
DB_PORT=5432
DB_DATABASE=pocketDeck
DB_USERNAME=postgres
DB_PASSWORD=Password12345

Genera la clave de la aplicación:

php artisan key:generate

Ejecuta las migraciones para crear las tablas en la base de datos:

php artisan migrate

Inicia el servidor de Laravel:

php artisan serve

Instalación del Frontend (Angular)

Dirígete a la carpeta del frontend:

cd frontend

Instala las dependencias de Angular:

npm install

Inicia el servidor de desarrollo:

ng serve

Ejecución del proyecto

Asegúrate de que el backend (Laravel) está en ejecución en http://127.0.0.1:8000.

Asegúrate de que el frontend (Angular) está corriendo en http://localhost:4200.

Accede a la aplicación desde tu navegador.
