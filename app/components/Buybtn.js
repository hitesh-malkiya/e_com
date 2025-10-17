'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './Botton'
import { useSession } from 'next-auth/react'

export const Buybtn = ({ productId }) => {
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
  const { data: session} = useSession()
    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleAddToCart = async () => {
      
        
          const user = session?.user?.userName
           
                if (!user) {
                    alert('login first ')
                    return
                }
        if (!productId) {
            alert('Product ID is missing')
            return
        }
        setLoading(true)
        try {
            // Only access localStorage on client side
            if (typeof window !== 'undefined') {
                localStorage.setItem('productId', productId)
                router.push('/order')
            }
        } catch (error) {
   
        } finally {
            setLoading(false)
        }
    }

    
    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <Button
                size='small'
                data=" buy now"
                variant="primary"
                type="button"
                disabled={true}
            />
        )
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
