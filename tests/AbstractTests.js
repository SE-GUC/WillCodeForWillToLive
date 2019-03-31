class AbstractTests {
    constructor(PORT,ROUTE){
        if (this.constructor === AbstractTests) {
            throw new TypeError('Can not construct AbstractTests class.')
        }
        if (this.runIndependently === AbstractTests.prototype.runIndependently) {
            throw new TypeError('Please implement AbstractTests method runIndependently.')
        }
        if (this.postRequestIndependently === AbstractTests.prototype.postRequestIndependently) {
            throw new TypeError('Please implement AbstractTests method postRequestIndependently.')
        }
        if (this.getRequestIndependently === AbstractTests.prototype.getRequestIndependently) {
            throw new TypeError('Please implement AbstractTests method getRequestIndependently.')
        }
        if (this.putRequestIndependently === AbstractTests.prototype.putRequestIndependently) {
            throw new TypeError('Please implement AbstractTests method putRequestIndependently.')
        }
        if (this.deleteRequestIndependently === AbstractTests.prototype.deleteRequestIndependently) {
            throw new TypeError('Please implement AbstractTests method deleteRequestIndependently.')
        }
        this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
        this.sharedState = {}
        this.runIndependently = this.runIndependently.bind(this)
        this.postRequestIndependently = this.postRequestIndependently.bind(this)
        this.getRequestIndependently = this.getRequestIndependently.bind(this)
        this.putRequestIndependently = this.putRequestIndependently.bind(this)
        this.deleteRequestIndependently = this.deleteRequestIndependently.bind(this)
    }

    runIndependently(){
        expect(1).toBe(1)
    }

    postRequestIndependently () {
        throw new TypeError('Do not call abstract method postRequestIndependently from child.')
    }

    getRequestIndependently () {
        throw new TypeError('Do not call abstract method getRequestIndependently from child.')
    }

    putRequestIndependently () {
        throw new TypeError('Do not call abstract method putRequestIndependently from child.')
    }

    deleteRequestIndependently () {
        throw new TypeError('Do not call abstract method deleteRequestIndependently from child.')
    }
    
}

module.exports = AbstractTests