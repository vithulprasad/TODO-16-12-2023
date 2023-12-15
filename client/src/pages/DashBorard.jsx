import React, { useEffect, useState } from "react";
import axios from "axios";
import { user } from "../API/apis";
import NavBar from "../component/NavBarOne";
import CardAdd from "../component/CardAdd";
import CardList from "../component/CardList";

function DashBorard() {
  const [add, setAdd] = useState(0);

  return (
    <div>
      <NavBar />
      <button
        onClick={() => {
          add === 0 ? setAdd(1) : setAdd(0);
        }}
        type="button"
        className="ml-20 w-[150px] my-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {add === 0 ? "show Todo items" : "add toDoItems"}
      </button>
      {add === 0 ? <CardAdd /> : <CardList />}
    </div>
  );
}

export default DashBorard;
