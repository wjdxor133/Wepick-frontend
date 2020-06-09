import React, { useState, useEffect } from "react";


const IndexPage = () => {
  const [count, setCount] = useState(0);


  useEffect(() => {
    document.documentElement.scrollTop = count * 10
  });

  return (
    <div className="indexPage" style={{ height: "200vh" }}>
      내가 바로 인덱스 페이지야

      Hello 12345

      <h1>ddddddd</h1>

      <h3>{count}</h3>
      <button onClick={() => setCount(count + 1)} />
    </div>
  );
}



export default IndexPage;