const functions = require('./fn')

test('post a certain investor', async () => {
    const data = {
        "email": "hadile@gmail.com",
        "username": "araf",
        "password": "whatever",
        "typeOfID": "id",
        "name": "liloo",
        "nationality": "egyptian",
        "capital": "12345678",
        "DOB": "10-11-2000",
        "mobileNumber": "0123456181",
        "address": "whateverdfghj",
        "faxNumber": "23456725672",
        "gender": "Female"
        
    }
    const poster = await functions.postInvestor()
    const msg = 'Your Investor profile was created successfully'
    expect.hasassertions()
    expect(poster.data.msg).toEqual(msg)
});




