import React, { useState, useEffect, Fragment } from "react";
import LogCard from "./LogCard";

function Logs() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
    const url = "http://localhost:4000/api/v1/users/logs";

    const getLogs = async () => {
        await fetch(url)
        .then((response) => response.json())
        .then((result) => {
            // console.log(result.data.logs);
            setLogs(result.data.logs);
            setIsLoading(false);
        })
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      getLogs();
    }, []);
  
    if (isLoading){
        return <div>Loading...</div>
    }

    // datos rusiavimas
    function sortByDate(a, b) {
        if (a.date_created < b.date_created) {
          return 1;
        }
        if (a.date_created > b.date_created) {
          return -1;
        }
        return 0;
    }

    var logsByDate = logs.sort(sortByDate)

    const logRow = logsByDate.map((log) => {
        return (
            <LogCard
            key={log._id}
            email = {log.email}
            action = {log.action}
            amount = {log.amount}
            date = {log.date_created}
            />
        );
    });

  return (
    <>
      <div className="History-container">
        <table className="History-body">
          <thead className="History-thead">
            <tr>
              <th>email</th>
              <th>action</th>
              <th>amount</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>{logRow}</tbody>
        </table>
      </div>
    </>
  )
}

export default Logs