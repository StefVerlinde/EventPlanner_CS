import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Form from "./components/Form";

function App() {
  const [{data}, setCardData] = useState({});

  return (
    <>
      <Form cardData={setCardData} />
      {data && <Card data={data}/>}
    </>
  );
}

export default App;
