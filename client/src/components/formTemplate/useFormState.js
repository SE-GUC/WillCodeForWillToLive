import { useState } from 'react'

export default initialValue => {
    const [fields, setFields] = useState(initialValue)

    return {
        fields,
        addField: _ => setFields([...fields, {key:Date.now()}]),
        deleteField: index => setFields(fields.filter((_, i) => i !== index)),
        updateField: (index, data) => setFields(fields.map((f, i) => index===index? {...data, key:f.key}:f))
    }
}