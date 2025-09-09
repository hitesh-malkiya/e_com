'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
export function SortSpan({dataName}) {


    const router = useRouter()
    const pathname = usePathname()

    const handleClick = () =>{
 
        const params = new URLSearchParams(window.location.search)
        if(dataName == "all"){
            params.delete('category')
        }else{
            params.set('category', dataName)
        }

        const queryString = params.toString()
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
    }
    return (
      <span onClick={()=> handleClick()} className="border-b-2 border-transparent hover:border-[var(--sec-accent-coor)] transition-colors duration-300 hover:text-[var(--sec-accent-coor)]">{dataName}</span>
    )
  }