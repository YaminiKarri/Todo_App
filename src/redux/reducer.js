import { createSlice} from "@reduxjs/toolkit";
import { arrayMove } from "react-sortable-hoc";

const initialState = [] ;

const addTodoReducer = createSlice({
    name:'todos',
    initialState,
    reducers:{
        //Write your reducers here.
        //Adding todos
        addTodos : (state, action) =>{
            state.push(action.payload);
            return state;
        },

        //Remove todos
        removeTodos : (state, action) =>{
            return state.filter(item => item.id !== action.payload);    
        },

        //Update todos
        updateTodos : (state, action) =>{
            return state.map((todo) =>{
                if(todo.id === action.payload.id){
                    return {
                        ...todo,
                        item: action.payload.item,
                        search: false,
                    }
                }
                return todo
            })
        },

        //Completed
        completeTodos : (state, action) =>{
            return state.map((todo) =>{

                if(todo.id===action.payload){
                    return {
                        ...todo,
                        completed: (todo.completed==true) ? false : true,
                        search: false
                    }
                }
                return todo
            })
        },

        //Search
        //Update todos
        searchTodos : (state, action) =>{
            
            return state.map((todo) =>{
                if(todo.item === action.payload){
                    
                    return {
                        ...todo,
                        search: true,
                    }
                }else{
                    return {
                        ...todo,
                        search: false,
                    }
                }
                return todo
            })
        },

        //close search
        closeSearchTodos : (state, action) =>{
            
            return state.map((todo) =>{
                if(todo.item === action.payload){
                    
                    return {
                        ...todo,
                        search: false,
                    }
                }
                return todo
            })
        },

        //DragDrop 
        dragDropTodos : (state, action) =>{
            console.log(action)
            return {
                ...state, 
                items: arrayMove(action.items, action.oldIndex, action.newIndex),
            }
            return state
        },
        

    }
})

export const {addTodos, removeTodos, updateTodos, completeTodos, searchTodos, closeSearchTodos} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;