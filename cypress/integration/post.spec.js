
describe('POST /characters', function(){

    before(function(){
        cy.request({
            method: 'POST',
            url: '/sessions',
            body: {
                email: "thanakin@qacademy.io",
                password: "qa-cademy"
            }
        }).then(function(response){
            expect(response.status).to.eql(200)
            cy.log(response.body.token)
            Cypress.env('token', response.body.token)
        })

        cy.request({
            method: 'DELETE',
            url: '/back2thepast/6294f445ca3d720016ce7cdf'
        }).then(function(response){
            expect(response.status).to.eql(200)
        })
    })
    
    it('deve cadastrar um personagem', function(){


        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.request({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then(function(response){
            expect(response.status).to.eql(201)
        })

    })

})