import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar'
import FiltriProdotti from "../components/StorePage/filtri_chiavica";
import Products from "../components/StorePage/PopProducts";

const Container1 = styled.div`
  margin-top: 80px;
  margin-left: 2em;
  margin-right: 2em; 
`;

const Prodotti = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFiltrata, setDataFiltrata] = useState([]);
  const [dataFiltrataFin, setDataFiltrataFin] = useState([]);

  function handleChangeFiltri(newValue) {
    setDataFiltrata(() => {
      return newValue;
    });
  }

  useEffect(() => {
    const tmp = {
      data: dataFiltrata,
    };
    setDataFiltrataFin(tmp);
  }, [dataFiltrata]);

  async function ok() {
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const Animal = urlParams.get("animale");
      const tag = urlParams.get('tipo')
      let response = {}
      if(Animal){
        console.log('inside animal')
        response = await fetch("https://site222301.tw.cs.unibo.it/api/item/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Animal }),
      });
    }else{
      console.log('inside')
        response = await fetch("https://site222301.tw.cs.unibo.it/api/item/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag }),
      });

    }
      const data = await response.json();
      setDataFiltrata(data);
    }
    const tmp = {
      data: dataFiltrata,
    };
    setDataFiltrataFin(tmp);
  }

  useEffect(() => {
    ok();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .post("https://site222301.tw.cs.unibo.it/api/item/")
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  }, []);

  return (
    <div>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle}/>
      <Container1>
      <FiltriProdotti onSubmit={handleChangeFiltri} />
      {loading ? (
        ""
      ) : (
        <div>

            {dataFiltrata.length > 0 ? (
              <Products data={dataFiltrataFin} tipo={false} />
            ) : (
              <Products data={data} tipo={false} />
            )}
        </div>
        )}
        </Container1>
        <Footer />
    </div>
  );
};

export default Prodotti;
