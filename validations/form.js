const joi = require('joi')
const FormTemplate = require('../models/FormTemplate')

const validateText = (constraints, input, required=true) => {
  const templateRequired = constraints.find(({name}) => name === 'required')
  if(required) {
    if(templateRequired && !input) {
      return `Missing value`
    }
    if(!templateRequired && !input) {
      return null
    }
  } else {
    if(!input) {
      return null
    }
  }
  for(let constraint of constraints) {
    switch(constraint.name.toLowerCase()) {
      case 'min length':
        if(input.length < constraint.value) {
          return 'min length not exceeded'
        }
      case 'max length':
        if(input.length > constraint.value) {
          return 'max length exceeded'
        }
    }
  }
}

const validateNumber = (constraints, input, required=true) => {
  const templateRequired = constraints.find(({name}) => name === 'required')
  if(required) {
    if(templateRequired && !input) {
      return `Missing value`
    }
    if(!templateRequired && !input) {
      return null
    }
  } else {
    if(!input) {
      return null
    }
  }
  if(!Number(input)){
    return 'NaN'
  }
  for(let constraint of constraints) {
    switch(constraint.name.toLowerCase()) {
      case 'min':
        if(Number(input) < constraint.value) {
          return 'min not exceeded'
        }
      case 'max':
        if(Number(input) > constraint.value) {
          return 'max exceeded'
        }
    }
  }
}

const validateDropdown = (constraints, input, required=true) => {
  const templateRequired = constraints.find(({name}) => name === 'required')
  if(required) {
    if(templateRequired && !input) {
      return `Missing value`
    }
    if(!templateRequired && !input) {
      return null
    }
  } else {
    if(!input) {
      return null
    }
  }
  if(!Number(input)){
    return 'NaN'
  }
  for(let constraint of constraints.filter(({name}) => name.toLowerCase() === 'item')) {
    if(constraint.value === input){
      return null
    }
  }
  return `invalid option`
}

const validateDate = (constraints, input, required=true) => {
  const templateRequired = constraints.find(({name}) => name === 'required')
  if(required) {
    if(templateRequired && !input) {
      return `Missing value`
    }
    if(!templateRequired && !input) {
      return null
    }
  } else {
    if(!input) {
      return null
    }
  }
  const dateInput = new Date(Date(input))
  if(!dateInput){
    return 'NaN'
  }
  const year = new Date().getFullYear() - dateInput.getFullYear()
  for(let constraint of constraints) {
    switch(constraint.name.toLowerCase()) {
      case 'min':
        if(year < constraint.value) {
          return 'min not exceeded'
        }
      case 'max':
        if(year > constraint.value) {
          return 'max exceeded'
        }
    }
  }
}

module.exports = {
  validateCreate: async (body) => {
    if(!body.formName || !body.regulatingLaw){
      return ({error: 'missing information'})
    }
    if (body.regulatingLaw !== 'Law 72' && body.regulatingLaw !== 'Law 195'){
      return ({error: 'incorrect law'})
    }
    const template = await FormTemplate.findOne({formNameEnglish: body.formName})
    const templateFields = template.fields
    let error = null
    for(let fieldName of Object.keys(body)) {
      if(fieldName.toLowerCase() === 'formname' || fieldName.toLowerCase() === 'regulatinglaw'){
        continue
      }
      const field = templateFields.find(({nameEnglish}) => nameEnglish===fieldName)
      if(!field) {
        return ({error: `Unknown field: ${fieldName}`})
      }
      switch(field.fieldType){
        case 'text':
          error = validateText(field.constraints, body[fieldName])
          if(error){
            return ({error: error})
          }
          break
        case 'number':
          error = validateNumber(field.constraints, body[fieldName])
            if(error){
              return ({error: error})
            }
            break
        case 'date': 
          error = validateDate(field.constraints, body[fieldName])
          if(error){
            return ({error: error})
          }
          break
        case 'dropdown':
          error = validateDropdown(field.constraints, body[fieldName])
            if(error){
              return ({error: error})
            }
      }
    }
     // TODO: Loop over keys from the template and make sure all required keys exist
    return ({})
  },
  validateUpdate: async body => {
    if(!body.formName){
      return ({error: 'missing information'})
    }
    if(body.regulatingLaw) {
      if (body.regulatingLaw !== 'Law 72' && body.regulatingLaw !== 'Law 195'){
        return ({error: 'incorrect law'})
      }
    }
    const template = await FormTemplate.findOne({formNameEnglish: body.formName})
    const templateFields = template.fields
    let error = null
    for(let fieldName of Object.keys(body)) {
      const field = templateFields.find(({nameEnglish}) => nameEnglish===fieldName)
      if(!field) {
        return ({error: `Unknown field: ${fieldName}`})
      }
      switch(field.fieldType){
        case 'text':
          error = validateText(field.constraints, body[fieldName], false)
          if(error){
            return ({error: error})
          }
          break
        case 'number':
          error = validateNumber(field.constraints, body[fieldName], false)
            if(error){
              return ({error: error})
            }
            break
        case 'date': 
          error = validateDate(field.constraints, body[fieldName], false)
          if(error){
            return ({error: error})
          }
          break
        case 'dropdown':
          error = validateDropdown(field.constraints, body[fieldName], false)
          if(error){
            return ({error: error})
          }
      }
    }
    return ({})
  }
}