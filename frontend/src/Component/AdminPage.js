import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminpage.css";

function AdminPage() {
  const [details, setDetails] = useState([]);
  const [booktitle, setBooktitle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishdate, setPublishdate] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");

  const [searchBooktitle, setSearchBooktitle] = useState("");
  const [searchAuthorname, setSearchAuthorname] = useState("");
  const [searchSubject, setSearchSubject] = useState("");
  const [searchPublisher, setSearchPublisher] = useState("");
  const [searchPublishdate, setSearchPublishdate] = useState("");
  const [searchType, setSearchType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://44.212.5.79:8000/db/getData");
        const d = res.data;
        console.log(d);
        setDetails(d.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);



  const handleSearch = async () => {
    const res = await axios.get("http://44.212.5.79:8000/db/getData");
    const d = res.data;
    console.log(d);
    // await setDetails(d.data);
    const filteredBooks = d.data.filter(
      (detail) =>
        (searchBooktitle === "" ||
          detail.booktitle
            .toLowerCase()
            .includes(searchBooktitle.toLowerCase())) &&
        (searchAuthorname === "" ||
          detail.authorname
            .toLowerCase()
            .includes(searchAuthorname.toLowerCase())) &&
        (searchSubject === "" ||
          detail.subject.toLowerCase().includes(searchSubject.toLowerCase())) &&
        (searchPublisher === "" ||
          detail.publisher
            .toLowerCase()
            .includes(searchPublisher.toLowerCase())) &&
        (searchPublishdate === "" ||
          detail.publishdate
            .toLowerCase()
            .includes(searchPublishdate.toLowerCase())) &&
        (searchType === "" ||
          detail.type.toLowerCase().includes(searchType.toLowerCase()))
    );
    setDetails(filteredBooks);
    console.log(filteredBooks);
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post("http://44.212.5.79:8000/db/addData", {
        booktitle,
        authorname,
        subject,
        publisher,
        publishdate,
        type,
        link
      });
      const data = res.data;
      if (data.result !== "ok") {
        alert(data.result);
      } else {
        setDetails([
          ...details,
          {
            booktitle: booktitle,
            authorname: authorname,
            subject: subject,
            publisher: publisher,
            publishdate: publishdate,
            type: type,
            link:link,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const element = details[index];
      await axios.delete("http://44.212.5.79:8000/db/deleteData", {
        data: { booktitle: element.booktitle },
      });
      const updatedDetails = details.filter((ele, i) => i !== index);
      setDetails(updatedDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Search by Booktitle"
          type="text"
          value={searchBooktitle}
          onChange={(e) => setSearchBooktitle(e.target.value)}
        />
        <input
          placeholder="Search by Authorname"
          type="text"
          value={searchAuthorname}
          onChange={(e) => setSearchAuthorname(e.target.value)}
        />
        <input
          placeholder="Search by Subject"
          type="text"
          value={searchSubject}
          onChange={(e) => setSearchSubject(e.target.value)}
        />
        <input
          placeholder="Search by Publisher"
          type="text"
          value={searchPublisher}
          onChange={(e) => setSearchPublisher(e.target.value)}
        />
        <input
          placeholder="Search by Publish Date"
          type="text"
          value={searchPublishdate}
          onChange={(e) => setSearchPublishdate(e.target.value)}
        />
        <input
          placeholder="Search by Type"
          type="text"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Booktitle</td>
            <td>Authorname</td>
            <td>Subject</td>
            <td>Publisher</td>
            <td>Publish Date</td>
            <td>Type</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => {
            return (
              <tr key={index}>
                <td><a href={detail.link} target="_blank">{detail.booktitle}</a></td>
                <td>{detail.authorname}</td>
                <td>{detail.subject}</td>
                <td>{detail.publisher}</td>
                <td>{detail.publishdate}</td>
                <td>{detail.type}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="addbook">
        <input
          placeholder="booktitle"
          type="text"
          value={booktitle}
          onChange={(e) => setBooktitle(e.target.value)}
        />
        <input
          placeholder="authorname"
          type="text"
          value={authorname}
          onChange={(e) => setAuthorname(e.target.value)}
        />
        <input
          placeholder="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          placeholder="publisher"
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <input
          placeholder="publishdate"
          type="text"
          value={publishdate}
          onChange={(e) => setPublishdate(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">""</option>
          <option value="PaperBack">PaperBack</option>
          <option vlaue="SoftCopy">SoftCopy</option>
        </select>
        <input
          placeholder="link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={handleAdd}>Add Book</button>
      </div>
    </div>
  );
}

export default AdminPage;
