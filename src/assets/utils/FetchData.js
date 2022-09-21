import { useEffect, useState } from "react";
import { RequestData } from "./RequestData";
import { decryptData, encryptData } from "./functions";

const FetchData = ({ method, url, payload, pathname }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    let encryptedData = "";
    if (pathname) {
      async function getData() {
        await RequestData(method, url, payload)
          .then((response) => {
            if (response.result) {
              setData(response.result);
              encryptedData = encryptData(JSON.stringify(response.result));
              localStorage.setItem(pathname, encryptedData);
              setLoading(false);
            }
          })
          .catch((err) => setError(err));
      }

      setLoading(true);
      if (localStorage.getItem(pathname)) {
        setData(decryptData(localStorage.getItem(pathname)));
        setLoading(false);
      } else {
        getData();
      }
    } else {
      async function getData() {
        await RequestData(method, url, payload)
          .then((response) => {
            if (response.result) {
              setData(response.result);
              setLoading(false);
            }
          })
          .catch((err) => setError(err));
      }
      setLoading(true);
      getData();
    }
  }, []); // eslint-disable-line
  
  return { data, loading, error };
};

export default FetchData;
