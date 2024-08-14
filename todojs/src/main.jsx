import React, { memo, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { useMemo } from 'react'
import './global.css'

const rootElement = document.getElementById('root')
// usually a div
const root = ReactDOM.createRoot(rootElement)
//createRoot is a react api used to create
function randomValue(){
    return Math.random()*1000;
}
 function PropExample(prop){
    return (
        <>
        I'm a random number <span className='component'>{prop.name}</span> - example of prop<br />
        </>
    )
}
function HookExample(){
    let [state,newstate]=useState(0);
    function Add(){
        newstate(state+1)
    }
    function Subtract(){
        newstate(state-1)
    }
    return (
        <>
        <button onClick={Subtract}>-</button><span className='buttonvalue component'>{state}</span><button onClick={Add}>+</button> - this is example of <span className='component'>useState </span>hook <br /><br />
        </>
    )
}
function HookEffect(){
    // let [x,updatex] =useState(0)
    
    let [time,time_updatefxn] = useState(0);
    useEffect(function(){
       const timer = setInterval(()=>{time_updatefxn(time+1)},1000)
       return ()=>clearInterval(timer);
    },[time])
    return(
        <>
        
        Setting a timer applying <span className='component'>useEffect</span> hook {`->`} Briefly, it helps to apply side effects in our components. <br />

        <span className='component'>Timer : {time} </span> - this does not changes when useState cause re-render.
        </>
    )
}

function HookStateRef(){

    let [x,updatex] =useState(0)
    let y = useRef(0)
       
     function UpdateX(){
        // y.current+=1;
          updatex(x+=1)
     }
    
    return(
        <>
        <br /><br />
        <button onClick={UpdateX}>re-render</button><br />
         x : <span className='component'>{x}
             </span> 
             <p>   </p>
             y : <span className='component'>{y.current}</span> - value of y is 0 inspite of re-rendering caused by useState of x.
        </>
    )

}
let clrarr=['red','black','blue','orange','yellow','green']
function HookRef(){
  
    let clr=useRef('black')
    let bd = document.querySelector('body')

    function Handle(){
        let randint = Math.trunc(Math.random()*7)
        // console.log(randint)
         clr.current=clrarr[randint]

        // console.log(clr.current);
        // para.innerHTML=x.current;
        bd.style.backgroundColor=clr.current
    }

    return(
         <> <br /> <br />
         <button onClick={Handle}>Change-Colour</button>
         <br />color will change without re-rendering of the component.
         </>
    )
}

function HookMemo(prop){

let [num,updatenum] =useState(0)

let a=Number(prop.x),b=Number(prop.y)


const Value = useMemo(()=>{return a+b},[a,b])

    return(
        <>
        <br /><br />
        example of <span className='component'>useMemo</span> where a function is recalculated only when one of its dependencies change. <br />
        <span className="component">memoizedValue = {Value}</span> - this will not chage until there is change in its parameters.
        <br />
        </>
    )
}

function HookContext(){
    
     function GrandParent(){
        const [userName,setUsername] =useState('Dheeraj')

        return(
            <>
            </>
        )
     }



    return(
        <>
        <p>Prop Drilling : Prop drilling is a common problem in React where data needs to be passed from a parent component to deeply nested child components that do not need to use that data directly but are forced to pass it along the chain. This can lead to cumbersome and difficult-to-maintain code, especially as your application grows in complexity.</p>
           
           

        </>
    )
}
root.render(
    <div className='main'> 
    * note : re-rendering only happens for the component where any re-render activity is done. <br />
     <span>this is a <span className='component'>Component</span></span><br />
    <PropExample name={randomValue()} />
    <HookExample />
    <HookEffect />
    <HookStateRef />
    <HookRef />
    <br />
    <HookMemo x="5" y="7" />
    <br /> <HookContext />
    <span className="component">useCallback : </span><br />
    <span className="component">useContext and context Api : </span><br />
    <span className="component"> useLayoutEffect :</span><br />

    </div>
)
