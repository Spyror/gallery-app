import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const App = () => {
  const [data, setData] = useState([]);

  const [index, setIndex] = useState(1);

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=30`
    );
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, [index]); 

  let printUserData = <h3 className="text-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading....</h3>;

  if (data.length > 0) {
    printUserData = data.map((elem, idx) => {
      return (
        <div>
          <a href={elem.url} target='_blank'>
            <div
              className='h-40 w-44 overflow-hidden bg-white rounded-xl'
              key={idx}
            >
              <img
                className='h-full w-full object-cover'
                src={elem.download_url}
                alt='not found'
              />
            </div>
            <h2 className='font-bold text-lg'>{elem.author}</h2>
          </a>
        </div>
      );
    });
  }
  return (
    <div className='bg-black overflow-auto h-screen p-4 text-white'>
      <div className='flex flex-wrap gap-4'>{printUserData}</div>

      <div className='flex items-center gap-4 w-70 justify-between mx-auto'>
        <button onClick={()=>{
          if(index>1){
            setData([])
            setIndex(index-1)
          }

        }}
        className='bg-blue-400 px-4 py-2 rounded-xl active:scale-95'>
          Previous
        </button>
        <h3>Page {index}</h3>
        <button onClick={()=>{
          setData([])
          setIndex(index+1)

        }}
        className='bg-green-400 px-4 py-2 rounded-xl active:scale-95'>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
