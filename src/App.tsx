import React from 'react';
import { atom, RecoilRoot, selector, useRecoilValue } from 'recoil';
import axios from 'axios';
import Calender from './Component/Calender';
import TodoFormModal from './features/TodoFormModal';

// const todoIdState = atom({
//   key: 'todoIdState',
//   default: 1
// })

// const todoItemQuery = selector({
//   key: 'todoItemQuery',
//   get: async ({ get }) => {
//     const id = get(todoIdState);

//     const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
//     return response.data;
//   }
// })

function App() {

  // const data = useRecoilValue(todoItemQuery);


  return (
    <RecoilRoot>
      <Calender />
    </RecoilRoot>
  );
}

export default App;
