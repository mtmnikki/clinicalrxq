import React from 'react'

interface SafeTextProps {
	value: string
}

const SafeText: React.FC<SafeTextProps> = ({ value }) => {
	return <span>{value}</span>
}

export default SafeText