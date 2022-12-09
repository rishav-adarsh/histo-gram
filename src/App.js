import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';


function App() {
  const [data, setData] = useState([]);

  // to remove all non-alphabetic characters
  const preprocess = (word) => {
    let res = "";
    for (let ch of word) {
      if (ch !== ch.toUpperCase()) res += ch;
    }
    return res;
  };

  const command = async () => {
    const curData = await fetch("https://www.terriblytinytales.com/test.txt")
      .then((raw) => raw.text())
      .then((txt) => {
        let myMap = new Map();
        txt.split(" ").map((word) => {
          word.toLowerCase();
          word = preprocess(word);
          if (word.length > 0) {
            if (!myMap.has(word)) myMap.set(word, 0);
            myMap.set(word, myMap.get(word) + 1);
          }
          return true;
          // console.log(word ,myMap.get(word) ,myMap.has(word))
        });
        // myMap.sort()
        myMap = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]))
        // console.log(map)
        // for (let [key, value] of map) {
        //   console.log(key, value);
        // }

        let res = []
        let k = 20
        for(let [key ,value] of myMap) {
          res.push({
            key, value
          })
          if(--k === 0)
           break 
        }
        // console.log(res)
        return res
      });
      setData(curData)
      console.log(data)
    // map = new Map([...map.entries()]).
  };

  return (
    <div className="App">
      <button onClick={() => command()}>Submit</button>
      <BarChart width={730} height={250} data={data}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="key" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
    </div>
  );
}

export default App;
