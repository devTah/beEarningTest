import "./App.css";
import { useEffect, useState } from "react";
import _ from "lodash";
import ArrowLeft from "./res/icons/arrowLeft";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import CopyIcon from "./res/icons/copy";
import ArrowRight from "./res/icons/arrowRight";
function App() {
  
  const [data, setdata] = useState([]);
  const [seedPhase, setSeedPhase] = useState([]);

  const sortArr = (arr) => {
    console.log(
      arr
        .sort((a, b) => {
          if (a < b) return 1;
          if (a > b) return -1;
          return 0;
        })
        .join("")
    );
  };

  const getWord = async () => {
    const word = [];
    const response = await fetch("eng.json", { mode: "cors" }).then((res) => res.json());
    if (response && response.length > 0) {
      for (let i = 0; i <= response.length; i++) {
        const newWord = response[Math.floor(Math.random() * response.length)];
        if (word.length === 24) break;
        if (word.length < 24 && !word.includes(newWord)) {
          word.push({ name: newWord, index: i });
        }
      }
    }
    setdata(word);
  };

  const groupWord = () => {
    const list = [];
    data.forEach((item, index) => {
      if (index < 18) {
        list.push(item);
      }
    });
    const newList = _.chunk(list, 3);
    const arrList = newList.map((arr) => {
      return { list: arr.map((val) => val.name), primary: arr[arr.length - 1].index, "index-selected": -1 };
    });
    setSeedPhase(arrList);
  };

  useEffect(() => {
    sortArr([0, 10, 1, 99, 9, 8, 79, 91, 22, 32, 12]);
    sortArr([99, 19, 29, 39, 11, 21, 32, 33, 35, 50, 60, 90]);
    sortArr([1, 10, 19, 11, 13, 16, 19]);
    getWord();
  }, []);

  useEffect(() => {
    if (data) {
      groupWord();
    }
  }, [data]);

  const _handleCopy = () => {};

  return (
    <div className="App">
      <div className="head mb-16">
        <ArrowLeft />
        <div className="title">Create New Wallet</div>
      </div>
      <div className="auto-gen-title mb-16">Auto Gen Seed Phrase?</div>
      <div className="body">
        <Row>
          {seedPhase.map((item) => {
            let counter = 0;
            return item.list.map((val) => {
              counter = counter + 1;
              return (
                <Col xs={4} className="mb-16">
                  <div className="card-seed d-flex align-items-center">
                    <div className="card-seed-number">
                      <span className="number">{counter}</span>
                    </div>
                    <span className="text">{val}</span>
                  </div>
                </Col>
              );
            });
          })}
        </Row>
        <div className="copy">
          <div className="text">Tap to Copy or Carefully write down your seed phrase and store it in a safe place</div>
          <div className="icon" onClick={_handleCopy}>
            <CopyIcon />
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-info d-flex flex-row justify-content-between mb-16">
          <div>How does this work?</div>
          <div>
            <ArrowRight />
          </div>
        </div>
        <div>
          <Button size="lg" className="w-100 bg-blue"> Next</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
