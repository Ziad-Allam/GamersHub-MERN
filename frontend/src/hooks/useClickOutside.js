import React, { useEffect, useRef } from 'react'

export let useClickOutside = (handler) => {

    let domNode = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            // if (!domNode.current.contains(event.target)) {
            //     handler();
            // }
            if (domNode.current && !domNode.current.contains(event.target)) {
                handler();
            }
        });
    })

    return domNode 
}

export default useClickOutside

// import React, { useEffect, useRef } from 'react'

// export let useClickOutside = (handler) => {

//     let domNode = useRef()

//     useEffect(() => {
//         let maybeHandler = (event) => {
//             if (!domNode.current.contains(event.target)) {
//                 handler();
//             }
//         }
//         document.addEventListener("mousedown", maybeHandler);

//         return () => {
//             document.removeEventListener("mousedown", maybeHandler);
//         }
//     });

//     return domNode 
// }

// export default useClickOutside
