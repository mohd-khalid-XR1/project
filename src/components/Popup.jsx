import React, { useEffect, useState } from 'react'
import { RiArrowRightUpFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { popupEmptyReducer } from '../redux/features/booleanSlice';
const Popup = () => {
    const dispatch = useDispatch()
    const popup = useSelector((state) => state.booleanSlice.popupState)
   
    const [active, setActive] = useState(false)
    const popupSystem = () => {
        setActive(true)
        setTimeout(() => {
            dispatch(popupEmptyReducer())
        }, 4000)
    }

    useEffect(() => {
        if (popup.message) {
            popupSystem()
        } else {
            setActive(false)
        }
    }, [popup])

    return (
        <div className={`w-[20dvw] h-[15dvh] border ${popup.success ? "border-green-500" : 'border-red-600'} rounded-md fixed top-[10dvh] ${active ? 'right-[3dvw]' : 'right-[-25dvw]'} transition-[right] transition-normal duration-[3000] ease-linear`}>
            {popup.success ? <div className='h-full'>
                <div className='w-full bg-green-500 text-white text-center flex justify-between gap-3 items-center h-[40%] px-5'>
                    <div className='flex items-center '>
                        <span>Success</span>
                        <RiArrowRightUpFill />
                    </div>
                    <span onClick={() => dispatch(popupEmptyReducer())}><ImCross /></span>

                </div>
                <div className='font-bold w-full h-[60%] flex items-center justify-center bg-white'>
                    {popup.message}
                </div>
            </div> : <div className='h-full'>
                <div className='w-full bg-red-500 text-white text-center flex justify-between gap-3 items-center h-[40%] px-5'>
                    <div className='flex items-center'>
                        <span>Failed</span>
                        <RiArrowRightUpFill />
                    </div>
                    <span onClick={() => dispatch(popupEmptyReducer())}>
                        <ImCross />
                    </span>

                </div>
                <div className='font-bold w-full h-[60%] flex items-center justify-center bg-white'>
                    {popup.message}
                </div>
            </div>}
        </div>
    )
}

export default Popup