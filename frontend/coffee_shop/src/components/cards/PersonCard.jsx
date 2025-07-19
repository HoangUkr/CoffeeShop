import React from 'react'

const PersonCard = ({ person }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center">
      <img
        src={person.image}
        alt={person.name}
        className="w-full h-48 object-contain bg-gray-100"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
        <p className="text-sm text-gray-500">{person.role}</p>
      </div>
    </div>
  )
}

export default PersonCard