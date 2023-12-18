import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import "./index.css";

const Home = () => {
  const items = JSON.parse(localStorage.getItem("tabularList3")); 
  console.log(items)
  const [list, setlist] = useState(items);
  // const [id,setid]=useState(null)

  const rowDeletion = (index) => {
    const deleteFilteration = list.filter((each) => each.id !== index);
    setlist(deleteFilteration);
    localStorage.setItem("tabularList3", JSON.stringify(deleteFilteration));
  };

  // const editRow=(index)=>{
  //   setid(index)
  // }

  const editChangeStatus = () => {
    localStorage.setItem("editClicked", JSON.stringify(true));
  }; 

  console.log(list);
  console.log(items);
  const acess = () => {
    if (list.length > 0) {
      return (
        <table className="table">
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {list.map((each, index) => {
            return (
              <tr key={each.id}>
                <th className="view">{each.id}</th>
                <th className="view">{each.name}</th>
                <th className="view">{each.phone}</th>
                <th className="view">{each.email}</th>
                <th>
                  <button onClick={() => rowDeletion(each.id)}>Delete</button>/
                  <Link to={`/form/${each.id}`}>
                    <button onClick={() => editChangeStatus()}>Edit</button>
                  </Link>
                </th>
              </tr>
            );
          })}
        </table>
      );
    }

    return <p className="data">No data to show</p>;
  };

  const addingTheTable = () => {
    localStorage.setItem("editClicked", JSON.stringify(false));
  };

  return (
    <div className="dataAdd">
      <h1>Add Data</h1>
      <Link to="/form">
        <button onClick={addingTheTable}>Add</button>
      </Link>
      {list === null ? <p>No data to show</p> : acess()}
    </div>
  );
};

export default Home;
