import { useState } from 'react'

export default initialValue => {
    const [constraints, setConstraints] = useState(initialValue)

    return {
        constraints,
        addConstraint: (_, data) => setConstraints([...constraints, data?{key: Date.now(), ...data}:{key: Date.now()}]),
        deleteConstraint: index => setConstraints(constraints.filter((_, i) => i !== index)),
        updateConstraint: (index, data) => setConstraints(constraints.map((c, i) => i===index?{...data, key:c.key}:c)),
        resetConstraints: _ => setConstraints([]),
        setConstraints: setConstraints
    }
}