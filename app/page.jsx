import React, {Suspense} from 'react';
import Form from "./addTodoForm";
import Todos from './Todos';

const Page = async() => {
  return (
    <div className="container">
      <Form/>
      <Suspense fallback={<div>Loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  )
}

export default Page