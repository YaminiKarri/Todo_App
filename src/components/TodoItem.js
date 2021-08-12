import React from 'react';
import { useRef } from 'react';
import {FaEdit} from 'react-icons/fa';
import {IoCheckmarkDoneSharp} from 'react-icons/io5';
import {AiFillDelete, AiFillCloseCircle} from 'react-icons/ai';
import Draggable from 'react-draggable';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from "@material-ui/core";


const TodoItem = (props) => {
    const {item, updateTodo, removeTodo, completeTodo, searchTodo, closeSearchTodo} = props;

    const inputRef = useRef(true); 

    const changeFocus = () =>{
        inputRef.current.disabled = false;
        inputRef.current.focus();
    }

    const update = (id, value, e) =>{
        if(e.which === 13){                                      //Here 13 is the key code for enter key
            updateTodo({id, item: value});
            inputRef.current.disabled = true;
        }
    }

    const cardStyle={margin: "5px" ,height:'12vh'    }

    return (

        <div>
        {
            item.search === false ?

            <li key={item.id} className="card">
            <textarea ref= {inputRef} disabled={inputRef} defaultValue={item.item} onKeyPress={(e) => update(item.id, inputRef.current.value, e)}/>
            <div className="btns">
                <button onClick={()=> changeFocus()}><FaEdit /></button>
                <button onClick={()=> completeTodo(item.id)}><IoCheckmarkDoneSharp /></button>
                <button style={{color:'#EC2D5B'}} onClick={()=> removeTodo(item.id)}><AiFillDelete /></button>
            </div>
            {item.completed && <span className="completed">Done</span>}
            </li>
            
            :
            
            <li key={item.id} className="card">
            <textarea ref= {inputRef} disabled={inputRef} defaultValue={item.item} onKeyPress={(e) => update(item.id, inputRef.current.value, e)}/>
            <div className="btns">
                
                <button onClick={()=> changeFocus()}><FaEdit /></button>
                <button onClick={()=> completeTodo(item.id)}><IoCheckmarkDoneSharp /></button>
                <button style={{color:'#EC2D5B'}} onClick={()=> removeTodo(item.id)}><AiFillDelete /></button>
                <button style={{color:'#EC2D5B'}} onClick={()=>closeSearchTodo(item.item)}><AiFillCloseCircle /></button>
            </div>
            {item.completed && <span className="completed">Done</span>}
            </li>
          
        }
        </div>
    )
}

export default TodoItem
