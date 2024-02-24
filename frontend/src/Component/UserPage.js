import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userpage.css";

function UserPage() {
  const [details, setDetails] = useState([]);
  // const [reqDetails, setReqdetails] = useState([]);
  // const [borrowed, setBorrowed] = useState([]);
  // const [username, setUsername] = useState(localStorage.getItem('username'));

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
        setDetails(d.data);
      } catch (error) {
        console.log(error);
      }
    };
    // const fetchReq = async () => {
    //   try {
    //     const res = await axios.post("http://localhost:8000/db/getReq", { username });
    //     const d = res.data;
    //     setReqdetails(d.data);
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
    // }
    // const fetchBorrowed = async () => {
    //   try {
    //     const res = await axios.post("http://localhost:8000/db/getBorrowed", { username });
    //     const d = res.data;
    //     setBorrowed(d.data);
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
    // }
    fetchData();
    // fetchReq();
    // fetchBorrowed();
  }, []);

  // const handleRequest = async (index) => {
  //   try {
  //     const { booktitle, authorname, subject, publisher, publishdate, type, link } = details[index];
  //     await axios.post("http://localhost:8000/addRequest",
  //       {
  //        username, booktitle, authorname, subject, publisher, publishdate, type, link,
  //       });
  //     setReqdetails([...details, { booktitle, authorname, subject, publisher, publishdate, type, link }]);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  // const handleReturn = async (index) => {
  //   try {
  //     const { booktitle, authorname, subject, publisher, publishdate, type, link } = details[index];
  //     await axios.post("http://localhost:8000/db/return",
  //       {
  //        username,  booktitle, authorname, subject, publisher, publishdate, type, link,
  //       });
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

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
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <table>
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
          {reqDetails.map((detail, index) => {
            return (
              <tr key={index}>
                <td><a href={detail.link} target="_blank">{detail.booktitle}</a></td>
                <td>{detail.authorname}</td>
                <td>{detail.subject}</td>
                <td>{detail.publisher}</td>
                <td>{detail.publishdate}</td>
                <td>{detail.type}</td>
                <td><button onClick={()=>handleRequest(index)}>Request</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
          {borrowed.map((detail, index) => {
            return (
              <tr key={index}>
                <td><a href={detail.link} target="_blank">{detail.booktitle}</a></td>
                <td>{detail.authorname}</td>
                <td>{detail.subject}</td>
                <td>{detail.publisher}</td>
                <td>{detail.publishdate}</td>
                <td>{detail.type}</td>
                <td><button onClick={()=>handleReturn(index)}>Return</button></td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
}

export default UserPage;
