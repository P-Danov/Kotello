export interface Todo {
    id:number;
    todo:string;
    isDone:boolean;
}

export interface User {
    name:string;
    age:number;
}

// type Actions = 
//     | {type:'add',payload: string}
//     | {type:'remove',payload: number}
//     | {type:'done',payload: number}

// const TodoReducer = (state:Todo[],action) =>{

// }

// import {useReducer} from 'react'
// import React from 'react'

// const ReducerExample = () => {

//     const [state,dispatch] = useReducer(TodoReducer,[])
//   return (
//     <div>
         
//     </div>
//   )
// }

// export default ReducerExample