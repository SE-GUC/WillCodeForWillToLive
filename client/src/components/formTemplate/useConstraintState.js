import { useState } from 'react'

export default initialValue => {
    const [constraints, setConstraints] = useState(initialValue)

    return {
        constraints,
        addConstraint: _ => setConstraints([...constraints, {key: Date.now()}]),
        deleteConstraint: key => setConstraints(constraints.filter(c => c.key !== key)),
        updateConstraint: (key, data) => setConstraints(constraints.map(c => c.key===key?{...data, key:key}:c)),
        resetConstraints: _ => setConstraints([])
    }
}