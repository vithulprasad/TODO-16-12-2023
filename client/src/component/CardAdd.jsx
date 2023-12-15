import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, removeComplete, removeTodo } from "../Redux/slices/setTodo";
import axios from "axios";
import { user } from "../API/apis";

function CardAdd() {
  const dispatch = useDispatch();
  const [sedit,setEdit] = useState()
  const [value, setValue] = useState("");
  const [editTask,setEditTask] = useState()
  const todoList = useSelector((value) => {
    return value.todo;
  });
  const token = useSelector((value) => {
    return value.user;
  });
  const submitting = () => {
    if (value === null || value === "") {
      toast.error("please add something before you submit");
    } else {
        function randomString(length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
            if (! length) {
                length = Math.floor(Math.random() * chars.length);
            }
            var str = '';
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }
      if (todoList.length) {
    
        if (todoList.length > 8) {
          toast.error("maximum limit is reached");
        } else {    
            var div = randomString(20);
          let data = {
            task: value,
            id: div,
          };
          setValue("");
          dispatch(addTodo(data));
        }
      } else {
        var div = randomString(20);
        let data = {
          task: value,
          id: div
        };
        setValue("");
        dispatch(addTodo(data));
      }
    }
  };
    const handleDelete=(id)=>{
        dispatch(removeTodo(id))
    }
    const handleEdit=(id)=>{
        setEdit(id)
    }
  const handleCardSubmit = async() => {
    await axios.post(`${user}addTodoList`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${token.token}`
        },
        todoList
    }).then((value)=>{
        if(value.data.success === true){
            toast.success("card saved success fully ");
            dispatch(removeComplete())
        }else{
            toast.error("something went wrong ");
        }
    })
    .catch((err)=>{
        toast.error(`${err.message}`)
    })
  };


  const confirmEditing = (id)=>{
 
    let data = {
        id:id,
        task:editTask
    }
    dispatch(editTodo(data))
    setEdit("")
  }
  return (
    <div className="w-screen h-[700px]   flex justify-center">
      <div className="w-[400px] h-[650px] bg-red-200 shadow-lg p-3">
        <div className="w-full h-10 bg-yellow-100 text-2xl font-mono font-medium text-center">
          <h1>Create Your todo</h1>
        </div>
        <div className="w-full p-2 flex gap-2 justify-between">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="p-3 w-[80%] h-10 mt-1"
            type="text"
          />
          <button
            onClick={() => {
              submitting();
            }}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add
            </span>
          </button>
        </div>
        <div className="w-full ">
          {todoList
            ? todoList.map((data, index) => (
                <div className="w-full flex gap-2" key={index}>
                    {sedit == data.id ? <input className=" w-full my-1" defaultValue={data.task} onChange={(e)=>{
                        setEditTask(e.target.value)
                    }}/>:
                  <div className="w-2/3 h-9 bg-yellow-100 my-2 text-lg font-mono font-bold  overflow-x-auto no-scrollbar  ">
                    {data.task}
                  </div>
                  }
                  {sedit == data.id ?<button onClick={()=>{confirmEditing(data.id)}} type="button" className="h-9 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-20 fled justify-center items-center">edit </button>
:
                  <>
                
                  <div className="flex justify-center">
                    
                    <button
                     onClick={()=>{handleEdit(data.id)}}
                      type="button"
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      E
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                    onClick={()=>{handleDelete(data.id)}}
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      R
                    </button>
                  </div>
                  </>
                 }
                </div>
              ))
            : null}
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleCardSubmit}
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            submit your task card
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAdd;
