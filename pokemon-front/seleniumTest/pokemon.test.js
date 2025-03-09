const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testPocketDex() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // 1. Abrir la aplicación Angular
        await driver.get('http://localhost:4200');

        // 2. Esperar a que cargue el título y verificarlo
        let title = await driver.findElement(By.css('h2')).getText();
        console.log('Título encontrado:', title);
        if (title !== 'Pokemones') {
            throw new Error('El título de la página no es correcto');
        }

        // 3. Verificar la tabla de Pokémon cargada
        let table = await driver.findElement(By.css('table'));
        let rows = await driver.findElements(By.css('table tr'));
        console.log(`Número de filas en la tabla: ${rows.length}`);

        if (rows.length < 2) {  // Al menos debe haber encabezado + datos
            throw new Error('La tabla de Pokémon no tiene datos');
        }

        // 4. Probar el filtrado
        let searchInput = await driver.findElement(By.css('.search input'));
        await searchInput.sendKeys('Pikachu', Key.RETURN);
        await driver.sleep(2000); // Esperar a que se aplique el filtro

        let filteredRows = await driver.findElements(By.css('table tr'));
        console.log(`Número de filas tras filtrar: ${filteredRows.length}`);

        if (filteredRows.length === rows.length) {
            throw new Error('El filtro de búsqueda no está funcionando');
        }

        // 5. Abrir el modal para agregar un nuevo Pokémon
        let addButton = await driver.findElement(By.css('.add'));
        await addButton.click();
        await driver.sleep(2000);

        let modal = await driver.findElement(By.css('.custom-modalbox'));
        if (!modal) {
            throw new Error('El modal de agregar Pokémon no se abrió correctamente');
        }

        let closeModal = await driver.findElement(By.css('.cancelar'));
        await closeModal.click();

        console.log('El modal de agregar Pokémon se abrió correctamente');

        // 6. Editar un Pokémon
        let editButton = await driver.findElement(By.css('.buttonEdit'));
        await editButton.click();
        await driver.sleep(2000);

        let editModal = await driver.findElement(By.css('.custom-modalbox'));
        if (!editModal) {
            throw new Error('El modal de edición no se abrió correctamente');
        }

        closeModal = await driver.findElement(By.css('.cancelar'));
        await closeModal.click();

        console.log('El modal de edición se abrió correctamente');

        console.log('Todas las pruebas pasaron correctamente.');

    } catch (error) {
        console.error('Error en la prueba:', error);
    } finally {
        await driver.quit();
    }
})();
