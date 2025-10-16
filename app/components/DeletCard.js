'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from './Botton'
import axios from 'axios'


function DeletCard({ productId, data }) {


    const [loading, setLoading] = useState(false)


    const { data: session } = useSession()
    const router = useRouter()

  const user = session?.user?.userName

    const handleDeleteFromCart = async () => {
        if (!productId) {
            alert('Product ID is missing')
            return
        }
        if (!user) {
            alert('login first ')
            return
        }
        setLoading(true)
        try {

            const response = await axios.delete('/api/user/card', {
                data: {
                    userName: user,
                    id: productId
                }
            })

            if (response?.status === 200) {
         
                
                alert(response?.data?.message)
                router.refresh()
            }
          

        } catch (error) {
            console.error('Error deleting from cart:', error)

        } finally {
            setLoading(false)
        }
    }

    
    return (
        <Button
        size='small'
            data={loading ? 'Deleting...' : data }
            variant="primary"
            onClick={handleDeleteFromCart}
            type="button"
            disabled={loading}
        />
    )
}

export default DeletCard