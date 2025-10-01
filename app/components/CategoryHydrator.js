// 'use client'

// import { useEffect } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { useAppDispatch } from '@/store'
// import { setCategory, clearCategory } from '@/store/categorySlice'

// export default function CategoryHydrator() {
//   const searchParams = useSearchParams()
//   const dispatch = useAppDispatch()

//   useEffect(() => {
//     const cat = searchParams.get('category')
//     if (cat) {
//       dispatch(setCategory(cat))
//     } else {
//       dispatch(clearCategory())
//     }
//   }, [searchParams, dispatch])

//   return null
// }


