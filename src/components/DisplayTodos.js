import {React, useState} from 'react';
import { connect } from 'react-redux';
import { addTodos, completeTodos, removeTodos, updateTodos, searchTodos, closeSearchTodos } from '../redux/reducer';
import TodoItem from './TodoItem';
import Draggable from 'react-draggable';


const mapStateToProps = (state) =>{
    return {
        todos: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo : (obj) => dispatch(addTodos(obj)),
        removeTodo : (id) => dispatch(removeTodos(id)),
        updateTodo : (obj) => dispatch(updateTodos(obj)),
        completeTodo : (id) => dispatch(completeTodos(id)),
        searchTodo : (obj)  => dispatch(searchTodos(obj)),
        closeSearchTodo: (item)=> dispatch(closeSearchTodos(item))
        
    }
}

const DisplayTodos = (props) => {
    const [sort, setSort] = useState('');

    return (
        
        <div className="displaytodos">
            <ul className="search">
                 {/**For search items */}
                 {
                    props.todos.length > 0 && sort !== 'completed' && sort !== 'active' ?

                    props.todos.map(item =>{
                        return (
                            item.search === true && 
                            <TodoItem 
                                key={item.id}
                                item={item}
                                removeTodo={props.removeTodo}
                                updateTodo={props.updateTodo}
                                completeTodo={props.completeTodo}
                                searchTodo={props.searchTodo} 
                                closeSearchTodo={props.closeSearchTodo}/>
                        )
                        
                    }) 
                    : null
                }
            </ul> 

            <div className="buttons">
                <button onClick={()=>setSort('active')}>Active</button>
                <button onClick={()=>setSort('completed')}>Completed</button>
                <button onClick={()=>setSort('all')}>All</button>
            </div>
            
               
            <ul>
                {/**For added items */}
                {
                    props.todos.length > 0 && sort === '' ?

                    props.todos.map(item =>{
                        return (
                           
                            <TodoItem 
                                key={item.id}
                                item={item}
                                removeTodo={props.removeTodo}
                                updateTodo={props.updateTodo}
                                completeTodo={props.completeTodo}
                                searchTodo={props.searchTodo} />
                        )
                    }) 
                    : null
                }


                {/**For active items */}
                {
                    props.todos.length > 0 && sort === 'active' ?

                    props.todos.map(item =>{
                        return (
                            item.completed === false && 
                            <TodoItem 
                                key={item.id}
                                item={item}
                                removeTodo={props.removeTodo}
                                updateTodo={props.updateTodo}
                                completeTodo={props.completeTodo}
                                searchTodo={props.searchTodo} />
                        )
                    }) 
                    : null
                }

                {/*For completed items*/}
                {
                    props.todos.length > 0 && sort === 'completed' ?

                    props.todos.map(item =>{
                        return (
                            item.completed === true && 
                            <TodoItem 
                                key={item.id}
                                item={item}
                                removeTodo={props.removeTodo}
                                updateTodo={props.updateTodo}
                                completeTodo={props.completeTodo}
                                searchTodo={props.searchTodo} />
                        )
                    }) 
                    : null
                }

                {/*For all items */}
                {
                    props.todos.length > 0 && sort === 'all' ?

                    props.todos.map(item =>{
                        return (
                            <TodoItem 
                                key={item.id}
                                item={item}
                                removeTodo={props.removeTodo}
                                updateTodo={props.updateTodo}
                                completeTodo={props.completeTodo}
                                searchTodo={props.searchTodo}
                            />
                        )
                    }) 
                    : null
                }
            </ul>
        </div>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
