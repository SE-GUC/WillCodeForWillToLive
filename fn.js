const axios = require('axios');
const functions = {    
//testing cruds
    getInvestor: async (id) => {
        const getInvestor = await axios.post(`http://localhost:3000/api/investor/${id}`)
        return getInvestor
    },
    updateInvestor: async (id,body) => {
        const updatedInvestor = await axios.post(`http://localhost:3000/api/investor/${id}`, body)
        return updatedInvestor
    },
    deleteInvestor: async (id) => {
        const deletedInvestor = await axios.post(`http://localhost:3000/api/investor/${id}`)
        return deletedInvestor
    },
    postInvestor: async (body) => {
        const postedInvestor = await axios.post(`http://localhost:3000/api/investor`, body)
        return postedInvestor
    },

    //user stories 

    getCompanies: async(id) => {
        const getCompanies = await axios.get(`http://localhost:3000/api/investor/company${id}`)
        return getCompanies
    },
    
    getCases: async(investor) => {
        const getCases = await axios.get(`http://localhost:3000/api/investor/company${investor}`)
        return getCases
    }


}