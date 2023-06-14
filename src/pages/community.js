import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import Community from "../components/Community";
import styled from "styled-components";

const Contenitore = styled.div`
  margin: 100px;
  margin-left: 2em;
  margin-right: 2em;
`;
const Container = styled.div` 
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
  }
`;

const CommunityPage = () => {
  const [note, setNote] = useState([]);
  const [giocatore, setGiocatore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("https://site222301.tw.cs.unibo.it/api/note/")
      .then((res) => {
        console.log(res);
        setNote(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
    console.log(note);

    axios
      .post("https://site222301.tw.cs.unibo.it/api/giocatore/")
      .then((res) => {
        console.log(res);
        setGiocatore(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(giocatore);

  }, []);

  return (
    <div>
      <Navbar></Navbar>
      {loading ? (
        ""
      ) : (
        <div>

                <Community note={note} giocatore={giocatore}></Community>

          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
