const functions = require('./fn')

postInvestor: async (body) => {
    const postedInvestor = await axios.post(`http://localhost:3000/api/investor`, body)
    return postedInvestor
};