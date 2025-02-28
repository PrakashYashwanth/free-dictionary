import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { InputContext } from "../App";
import Antonym from "./Antonym";
import Example from "./Example";
import MeaningsList from "./MeaningsList";
import Synonym from "./Synonym";
import HearVoice from "./HearVoice";
import "./ResultList.css";

axios.defaults.baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const ResultList = () => {
  const { inputValue } = useContext(InputContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async (param) => {
    try {
      setLoading(true);
      const res = await axios(`/${param}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      getData(inputValue);
    }
  }, [inputValue]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl">
        <div className="h-6 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-8 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-300 mt-5 rounded-md"></div>
      </div>
    );
  }

  if (inputValue === "") {
    return (
      <h3 className=" centering animate-pulse text-center mt-10 font-semibold text-gray-500">
        Please enter enter a word to start...👆
      </h3>
    );
  }

  if (error) {
    return (
      <h3 className="text-center mt-10 font-semibold text-gray-500">
        No Definitions Found 😒
      </h3>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {response && (
        <div>
          <HearVoice word={inputValue} />
          <div className="borders">
            <h3 className="text-2xl font-bold mt-4">Meanings & Definitions:</h3>
            <MeaningsList mean={response} />
          </div>
          <div className="borders">
            <h3 className="text-2xl font-bold mt-4">Example:</h3>
            <Example mean={response} />
          </div>
          <div className="borders">
            <h3 className="text-2xl font-bold mt-4">Synonym:</h3>
            <Synonym mean={response} />
          </div>
          <div className="borders">
            <h3 className="text-2xl font-bold mt-4">Antonym:</h3>
            <Antonym mean={response} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultList;
