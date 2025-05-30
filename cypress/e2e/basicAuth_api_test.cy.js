describe('Basic_auth_API Test',()=>{
    let config;
    before(()=>{
        cy.fixture('basicAuth_config').then((data)=>{
            config=data;
        })
    })

    it("Get Request",()=>{
        cy.request({
            method: "GET",
            url: config.baseUrl,
            auth:{
                username: config.username,
                password: config.password
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            cy.log(response.body)
        })
    })
})