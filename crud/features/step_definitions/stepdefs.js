const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { Builder, By, Key, untill } = require('selenium-webdriver')
const Task = require('../../src/models/Task')

const firefoxNav = new Builder()
    .forBrowser('firefox')
    .build()

Given('Abrir home de CRUD', { timeout: 20 * 1000 }, function () {
    return firefoxNav.get('http://localhost:2019')
});

Then('El titulo debe decir CRUD MONGO', { timeout: 20 * 1000 }, function () {
    firefoxNav.getTitle().then(function (title) {
        assert.equal(title, "CRUD MONGO")
        return title
    })
});

// btn btn-primary btn-block
Given('Llenar formulario de Tarea', { timeout: 20 * 1000 }, function () {
    firefoxNav.findElement(By.name('title')).sendKeys('Tarea Test1', Key.TAB)
    return firefoxNav.findElement(By.name('description')).sendKeys('Descripcion de la tarea Test', Key.TAB)
})

Then('Registrar tarea', { timeout: 20 * 1000 }, function () {
    // Write code here that turns the phrase above into concrete actions
    return firefoxNav.findElement(By.id('registrar')).click()
})




