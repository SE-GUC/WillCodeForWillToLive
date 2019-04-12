import { useState } from 'react'

export default initialValue => {
    const [attributes, setAttributes] = useState(initialValue)

    return {
        attributes,
        setAttributeWrap: (name, value) => {
            const newAttributes = attributes
            newAttributes[name] = value
            setAttributes(newAttributes)
        },
        deleteAttributeWrap: name => {
            const newAttributes = attributes
            delete newAttributes[name]
            setAttributes(newAttributes)
        }
    }
}