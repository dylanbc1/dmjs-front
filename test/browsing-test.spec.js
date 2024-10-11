const {By, Builder, WebElementCondition, until} = require('selenium-webdriver');
const assert = require('assert');
const { time } = require('console');

describe('Browsing Filtering Test', function() {
    this.timeout(20000); 
    it('should list products', async function() {
        let driver;
        try {
            
    
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('http://localhost:3000/');
            
    
          
            await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/nav/div/div[1]/div[1]/div/a')), 10000);
            let categoryInput = await driver.findElement(By.xpath('/html/body/div[2]/div/nav/div/div[1]/div[1]/div/a'));
            
    
    
            assert.equal(await categoryInput.getText(), 'DMajorStore')
           
    
           
        }catch(error){
            
            throw error
        }finally{
            await driver.quit();
        }
    
    })

    it('Product search', async function() {
        let driver;
        try {
            
    
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('http://localhost:3000/');
            
    
            await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/nav/div/div[1]/div[1]/div/a')), 10000);
            let categoryInput = await driver.findElement(By.xpath('/html/body/div[2]/div/nav/div/div[1]/div[1]/div/a'));
            
    
    
            assert.equal(await categoryInput.getText(), 'DMajorStore')
           
        }catch(error){
            
            throw error
        }finally{
            await driver.quit();
        }
    
    })

    it('Should add product to cart', async function() {
        let driver;
        try {
            
    
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('http://localhost:3000/');
            
    
            await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div/div")), 10000);
            let categoryInput = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div/div'));
            await categoryInput.click()
    
            await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div/div/div/div[2]/div/div/div[3]/button[2]')), 10000);
            let appleButton = await driver.findElement(By.xpath("/html/body/div[2]/div/div/div/div/div[2]/div/div/div[3]/button[2]"))
            assert.equal(await appleButton.getText(), 'Añadir al carrito')
            
    

    
           
        }catch(error){
            
            throw error
        }finally{
            await driver.quit();
        }
    })

    
    
})


    