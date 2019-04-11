import { useState } from 'react'

export default initialValue => {
    const [attributes, setAttributes] = useState(initialValue)

    return {
        attributes,
        setAttribute: (name, value) => {
            const newAttributes = attributes
            newAttributes[name] = value
            setAttributes(newAttributes)
        },
        deleteAttribute: name => {
            const newAttributes = attributes
            delete newAttributes[name]
            setAttributes(newAttributes)
        }
    }
}