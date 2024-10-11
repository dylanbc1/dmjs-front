const {By, Builder, WebElementCondition, until} = require('selenium-webdriver');
const assert = require('assert');
const { time } = require('console');

describe('Login Test', function() {
    this.timeout(20000); 
    it('should login with valid credentials', async function() {
        let driver;
        try {
            
            
    
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('http://localhost:3000/auth/login');
            
    
            await driver.wait(until.elementLocated(By.xpath('//*[@id="email"]')), 10000);
            let emailInput = await driver.findElement(By.xpath('//*[@id="email"]'));
            await emailInput.sendKeys('john.doe@example.com')
    
            let passwordInput = await driver.findElement(By.xpath('//*[@id="password"]'))
            await passwordInput.sendKeys('password123')
    
            let loginButton = await driver.findElement(By.xpath('/html/body/div[2]/div/div[2]/div/form/button[1]'))
            await loginButton.click()
           
    
            await driver.wait(until.urlIs('http://localhost:3000/'), 10000)
    
    
            
            let welcome = await driver.findElement(By.className("text-white text-2xl font-bold"))
            assert.equal(await welcome.getText(), 'DMajorStore')
            console.log("Test passed")
        }catch(error){
            
            throw error
        }finally{
            await driver.quit();
        }
    
    })

    it('should not login with invalid credentials', async function() {
        let driver;
        try {
            
            
    
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('http://localhost:3000/auth/login');
            
    
            await driver.wait(until.elementLocated(By.xpath('//*[@id="email"]')), 10000);
            let emailInput = await driver.findElement(By.xpath('//*[@id="email"]'));
            await emailInput.sendKeys('jonh.doe@example.com')
    
            let passwordInput = await driver.findElement(By.xpath('//*[@id="password"]'))
            await passwordInput.sendKeys('password123')
    
            let loginButton = await driver.findElement(By.xpath('/html/body/div[2]/div/div[2]/div/form/button[1]'))
            await loginButton.click()
            
            await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div[2]/div/form/div[1]')), 10000);
 
            
            let welcome = await driver.findElement(By.xpath('/html/body/div[2]/div/div[2]/div/form/div[1]'))
    
            assert.equal(await welcome.getText(), 'O')
            
        }catch(error){
           
            throw error
        }finally{
            await driver.quit();
        }
    
    })
})


    