
import { useState } from "react";
export default function Test() {
  const [datas, setDatas] = useState([
    {
      id: 1,
      name: "john",
      gender: "m",
      email: ""
    },
    {
      id: 2,
      name: "mary",
      gender: "f",
      email: ""
    }
  ]);

  const updateFieldChanged = (index) => (e) => {
    let newArr = [...datas]; // copying the old datas array
    let prop = e.target.name;
    newArr[index][prop] = e.target.value; // replace e.target.value with whatever you want to change it to
    setDatas(newArr); // ??
  };
  return (
    <div className="App">
      {datas &&
        datas.map((data, index) => (
          <li key={index}>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={updateFieldChanged(index)}
            />
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={updateFieldChanged(index)}
            />
          </li>
        ))}
    </div>
  );
}
