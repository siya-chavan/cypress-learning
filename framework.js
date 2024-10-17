///<reference types = "Cypress" />
import HomePage from '../pageObjects/HomePage'
import ProductPage from  '../pageObjects/ProductPage'

describe('My second Test Suite', function() 
{
    before(function() 
    {
      cy.fixture('example').then(function(data)
       {
        this.data=data
      })

    })
 
it('My FirstTest case',function() {
 
const homePage=new HomePage()
const productPage=new ProductPage()
cy.visit(Cypress.env('url')+"/angularpractice/")
homePage.getEditBox().type(this.data.name)
homePage.getGender().select(this.data.gender)
homePage.getTwoWayDataBinding().should('have.value',this.data.name)
homePage.getEditBox().should('have.attr','minlength','2')
homePage.getEntrepreneur().should('be.disabled')

homePage.getShopTab().click()

//add products using commands and fixture
this.data.productname.forEach(function(element){

    cy.selectProduct(element)
})

productPage.checkOutButton().click()
var sum=0
cy.get('tr td:nth-child(4) strong').each(($e1, index, $list)=>
{
  const amount=$e1.text()
  var res=amount.split(" ")
  res= res[1].trim()
  sum= Number(sum)+Number(res)
  
}).then(function()
{
  cy.log(sum)
})
cy.get('h3 strong').then(function(element)
{
  const amount=element.text()
  var res=amount.split(" ")
  var total= res[1].trim()
  expect(Number(total)).to.equal(sum)

})


productPage.checkOut().click()
productPage.deliveryLocation().type(this.data.location)
productPage.selectLocation().click()
productPage.checkBox().click({force: true})
productPage.purchaseButton().click()

//productPage.successMsg().should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
productPage.successMsg().then(function(element){
const actualText=element.text()
expect(actualText.includes("Success")).to.be.true

})




 
 
 
 
 
 
 
 
 
 

 
}  )
 
 
 
}  )