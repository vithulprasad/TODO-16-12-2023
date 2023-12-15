import axios from "axios";
import React, { useEffect, useState } from "react";
import { user } from "../API/apis";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function CardList() {
  const [data, setData] = useState(1);
  const [list, setList] = useState([]);
  const [refresh,setRefresh] = useState(true)
  const valueSelecter = useSelector((value) => {
    return value.user;
  });

  useEffect(() => {
    const fetchData = async () => {
      if (valueSelecter.token) {
        await axios
          .post(`${user}listTodo`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${valueSelecter.token}`,
            },
            data,
          })
          .then((res) => {
            if (res.data.success) {
              setList(res.data.values);
            } else {
              toast.success(`${res.data.message}`);
            }
          });
      }
    };

    fetchData();
  }, [data, valueSelecter.token,refresh]);

  const handleComplete = async (data) => {
    await axios
      .post(`${user}complete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${valueSelecter.token}`,
        },
        data,
      })
      .then(() => {
        toast.success(`task completed`);
        refresh ?setRefresh(false):setRefresh(true)
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };
  const handleNotComplete = async (data) => {

    await axios
      .post(`${user}notComplete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${valueSelecter.token}`,
        },
        data,
      })
      .then(() => {
        toast.success(`task uncomplete`);
        refresh ?setRefresh(false):setRefresh(true)
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };
  const handledeletetodo =async(data)=>{
    await axios
      .post(`${user}deleteOneTodo`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${valueSelecter.token}`,
        },
        data,
      }).then((res)=>{
        if(res.data.success==true){
                toast.success("deleted")
                refresh ?setRefresh(false):setRefresh(true)
        }else{
            toast.error("something went wrong")
        }
      })
      .catch((err)=>{
        toast.error(`${err.message}`)
      })
  }


  return (
    <>
    <div className="w-screen h-[400px] flex gap-3 justify-center">
      {list.map((val, index) => (
        <div className="w-[300px] h-[400px] bg-red-200 shadow-lg border p-3 rounded-lg" key={index}>
          <div className="w-full h-[90%]">
            {val.task.map((valu) => (
              <div className="w-full h-10 flex justify-around py-3">
                {valu.isComplete == true ? (
                  <h1 className="w-[70%] line-through">{valu.task}</h1>
                ) : (
                  <h1 className="w-[70%]">{valu.task}</h1>
                )}

                {valu.isComplete == true ? (
                  <div
                  className="flex items-center"
                    onClick={() => {
                        handleNotComplete(valu._id);
                    }}
                  >
                    <input
                    
                      checked
                      id="disabled-checked-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                ) : (
                  <div
                    class="flex items-center mb-4"
                    onClick={() => {
                      handleComplete(valu._id);
                    }}
                  >
                    <input
                   
                      id="disabled-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={()=>{handledeletetodo(val._id)}}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              delete
            </button>
          </div>
        </div>
      ))}
      
    </div>
    <div className="w-full flex justify-center mt-10" >
        <div className="w-[200px] h-14 flex justify-between">
           <button onClick={()=>{
            if(data > 1){
                setData(data-1)
            }else{
                toast.success("cannot go there")
            }
           }} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 h-10">prev</button>
           <button onClick={()=>{ 
                setData(data+1)
             
           }}  type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 h-10 dark:focus:ring-purple-900">next</button>
        </div>
    </div>

    
    </>
  );
}

export default CardList;
