import { useState } from 'react'

export default initialValue => {
    const [fields, setFields] = useState(initialValue)

    return {
        fields,
        addField: _ => setFields([...fields, {key:Date.now()}]),
        deleteField: key => setFields(fields.filter(f => f.key !== key)),
        updateField: (key, data) => setFields(fields.map(f => f.key===key? {...data, key:key}:f))
    }
}