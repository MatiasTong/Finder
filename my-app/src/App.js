import logo from './logo.svg';
import { useState, useEffect } from "react"
import './App.css'
import axios from "axios"
import ButtonAppBar from './components/ButtonAppBar'
import Item from "./components/Item"

const token = process.env.REACT_APP_TOKEN

function App() {
  const [data, setData] = useState()

  useEffect(async () => {
    const result = await axios.get(
      "https://api.ebay.com/buy/browse/v1/item_summary/search?q=cars&limit=100",
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).catch(error => console.log(error))

    setData(result.data.itemSummaries);
    console.log(data)
    // console.log(result);
  }, [])

  const customSort = () => {
    let array = [...data]
    array.sort((a, b)=> a.title.toLowerCase() > b.title.toLowerCase() ? 1: -1)
    setData(array)
    console.log(data)
    console.log("new" + JSON.stringify(data.map( (item)=> { return {title:item.title}} )))
  }


  return (
    <div className="App">
      <ButtonAppBar />
      {data && data.map((item) =>
        <Item title={item.title} />
      )}
      <button onClick={customSort}> Sort </button>
    </div>
  );
}

export default App;
