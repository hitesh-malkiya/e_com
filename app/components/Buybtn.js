'use client'

import { useState } from 'react'

import { Button } from './Botton'


export const Buybtn = ({ productId }) => {


    const [loading, setLoading] = useState(false)


    // const { data: session } = useSession()


    const handleAddToCart = async () => {
        if (!productId) {
            alert('Product ID is missing')
            return
        }
        setLoading(true)
        try {
            localStorage.setItem('productId', productId)

            window.location.href = '/order'

        } catch (error) {
            console.log(error);


        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            size='small'
            data={" buy now"}
            variant="primary"
            onClick={handleAddToCart}
            type="button"
            disabled={loading}
        />
    )
}
