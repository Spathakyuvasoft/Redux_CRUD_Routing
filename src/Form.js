import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.js";

const Form = () => {
  const acesstable = JSON.parse(localStorage.getItem("tabularList3"));
  const editClickedAcess = JSON.parse(localStorage.getItem("editClicked"));
  const editClickedLength = acesstable.length;

  const [formData, setForm] = useState({ name: "", phone: "", email: "" });
  const [number, setNumber] = useState(
    editClickedLength === undefined ? 0 : parseInt(editClickedLength)
  );
  const [kalsu, setKalsu] = useState(editClickedAcess);
  const [list, setList] = useState([]);
  const [errorObject, seterrorObject] = useState({});
  const [SelectedId, setSelectedId] = useState("");
  const [Status, setStatus] = useState(false);
  const params = useParams();
  const handle = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const empty1 = {};
    if (formData.name === "") {
      empty1.name1 = "*Name Required";
    } else if (formData.name.length <= 2) {
      empty1.name1 = "*Name characters should be greater than 2";
    }

    if (formData.phone === "") {
      empty1.phone1 = "*Phone Required";
    } else if (formData.phone.length !== 10) {
      empty1.phone1 = "*Phone number length to be 10";
    }

    if (formData.email === "") {
      empty1.email1 = "*Email Required";
    } else if (!formData.email.includes("@")) {
      empty1.email1 = "*Email must include @ format";
    }

    const objectLength = Object.keys(empty1).length;

    if (objectLength === 0) {
      setNumber(number + 1);
      formData.id = number;
      acesstable.push(formData);
      const newest = [...acesstable];
      localStorage.setItem("tabularList3", JSON.stringify(newest));
      setForm({
        name: "",
        phone: "",
        email: "",
      });
      seterrorObject({});
    } else {
      seterrorObject(empty1);
    }
  };

  const idAcess = params.id;

  useEffect(() => {
    if (kalsu) {
      const Finding = acesstable.find(
        (each) => parseInt(each.id) === parseInt(idAcess)
      );
      const { name, phone, email } = Finding;
      setForm({ name, phone, email });
    }

    return () => {
      setForm({ name: "", phone: "", email: "" });
    };
  }, [kalsu]);

  const changingEditClicked = () => {
    const Latest = acesstable.findIndex(
      (each) => each.id === parseInt(idAcess)
    );

    const ones = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      id: parseInt(idAcess),
    };
    acesstable.splice(Latest, 1, ones);
    const amale = [...acesstable];
    localStorage.setItem("tabularList3", JSON.stringify(amale));
    localStorage.setItem("editClickedAcess", JSON.stringify(false));
    setKalsu(false);
  };
  console.log(kalsu);
  return (
    <div className="form">
      <form onSubmit={formSubmit}>
        <label>Name:</label>
        <br />
        <input
          onChange={handle}
          type="text"
          name="name"
          value={formData.name}
        />
        <br />
        <label>phone:</label>
        <br />
        <input
          onChange={handle}
          type="text"
          name="phone"
          value={formData.phone}
        />
        <br />
        <label>Email:</label>
        <br />
        <input
          onChange={handle}
          type="text"
          name="email"
          value={formData.email}
        />
        <br />
        {editClickedAcess ? (
          <button
            onClick={changingEditClicked}
            type="button"
            className="buttonDesign"
          >
            Update
          </button>
        ) : (
          <button type="submit" className="buttonDesign">
            Submit
          </button>
        )}
        <Link to="/">
          <button className="buttonDesign">Check Table</button>
        </Link>
      </form>
    </div>
  );
};

export default Form;
