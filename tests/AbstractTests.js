class AbstractTests {
    constructor (PORT, ROUTE) {
      if (this.constructor === AbstractTests) {
        throw new TypeError('Can not construct AbstractTests class.')
      }
      if (this.runIndependently === AbstractTests.prototype.runIndependently) {
        throw new TypeError('Please implement AbstractTests method runIndependently.')
      }
     /* if (this.runDependently === AbstractTests.prototype.runDependently) {
        throw new TypeError('Please implement AbstractTests method runDependently.')
      }*/
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
     /* if (this.postRequestDependently === AbstractTests.prototype.postRequestDependently) {
        throw new TypeError('Please implement AbstractTests method postRequestDependently.')
      }
      if (this.getRequestDependently === AbstractTests.prototype.getRequestDependently) {
        throw new TypeError('Please implement AbstractTests method getRequestDependently.')
      }
      if (this.putRequestDependently === AbstractTests.prototype.putRequestDependently) {
        throw new TypeError('Please implement AbstractTests method putRequestDependently.')
      }
      if (this.deleteRequestDependently === AbstractTests.prototype.deleteRequestDependently) {
        throw new TypeError('Please implement AbstractTests method deleteRequestDependently.')
      }*/
  
      this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
      this.sharedState = {}
      this.runIndependently = this.runIndependently.bind(this)
     // this.runDependently = this.runDependently.bind(this)
      this.postRequestIndependently = this.postRequestIndependently.bind(this)
      this.getRequestIndependently = this.getRequestIndependently.bind(this)
      this.putRequestIndependently = this.putRequestIndependently.bind(this)
      this.deleteRequestIndependently = this.deleteRequestIndependently.bind(this)
     /* this.postRequestDependently = this.postRequestDependently.bind(this)
      this.getRequestDependently = this.getRequestDependently.bind(this)
      this.putRequestDependently = this.putRequestDependently.bind(this)
      this.deleteRequestDependently = this.deleteRequestDependently.bind(this)*/
    }
  
    runIndependently () {
      expect(1).toBe(1)
    }
  
    /*runDependently () {
      expect(1).toBe(1)
    }*/
  
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
  
    /*postRequestDependently () {
      throw new TypeError('Do not call abstract method postRequestDependently from child.')
    }
  
    getRequestDependently () {
      throw new TypeError('Do not call abstract method getRequestDependently from child.')
    }
  
    putRequestDependently () {
      throw new TypeError('Do not call abstract method putRequestDependently from child.')
    }
  
    deleteRequestDependently () {
      throw new TypeError('Do not call abstract method deleteRequestDependently from child.')
    }*/
  }
  
  module.exports = AbstractTests