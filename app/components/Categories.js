import React from 'react'

function Categories() {

    
    const categories = [
        { name: 'Electronics', icon: '📱', count:  0 },
        { name: 'Sports', icon: '⚽', count:  0 },
        { name: 'Home', icon: '🏠', count:  0 },
        { name: 'Fashion', icon: '👕', count: 200 },
        { name: 'Books', icon: '📚', count: 300 },
        { name: 'Beauty', icon: '💄', count: 120 }
      ];

  return (
    <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition duration-300 cursor-pointer"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600">{category.count} items</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Categories