'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from './Botton'
import { useSession } from 'next-auth/react'

export const AddToCartButton = ({ productId}) => {
    const [loading, setLoading] = useState(false)


    const { data: session } = useSession()
    const {status} = useSession()
  const user = session?.user?.userName
    const handleAddToCart = async () => {
        if (!productId) {
            alert('Product ID is missing')
            return
        }

        setLoading(true)

        try {





            // Call the API to add item to cart using axios
            const response = await axios.put('/api/user/card', {
                userName:user,
                id: productId
            })

            if (response?.status === 200) {
                alert('Added to cart')
            }
          

        } catch (error) {
            console.error('Error adding to cart:', error)
            if (error?.response?.status === 409) {
                alert('Already in cart')
                return
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            data={loading ? 'Adding...' : 'Add to Cart'}
            variant="primary"
            onClick={handleAddToCart}
            type="button"
            disabled={loading}
        />
    )
}
