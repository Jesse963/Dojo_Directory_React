import React from "react";
import "./App.css";
import SummaryCardContainer from "./components/summaryCardContainer/summaryCardContainer";
import NavBar from "./components/navbar/navbar";

// const getSchools = async () => {
//   console.log("Entered getSchools");
//   const rawSchools = await fetch("/routes/api/getAll");
//   console.log(`Raw Schools: ${rawSchools}`);

//   let schools = await rawSchools.json();
//   console.log(`Parsed Schools: ${schools.result}`);
// };

const testDojos = [
  {
    _id: "606e38e7726a66549c3f732c",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm...",
    name: "Mushin Goju Ryu Karate Academy",
    sensei: "Jesse Jenkins",
    address: "106 Links Ave Concord",
    postcode: "2137",
    state: "NSW",
    email: "jesse-jenkins@hotmail.com",
    password: "$2b$10$t/iHo4eToTulRrPAVALu1ugjJH.bRua.fzoZ5RB2EiXmSq0laWSfq",
  },

  {
    _id: "606e38e7726a66549c3f732c",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm...",
    name: "Roubas Goju Ryu Karate Academy",
    sensei: "Jesse Jenkins",
    address: "106 Links Ave Concord",
    postcode: "2137",
    state: "NSW",
    email: "jesse-jenkins@hotmail.com",
    password: "$2b$10$t/iHo4eToTulRrPAVALu1ugjJH.bRua.fzoZ5RB2EiXmSq0laWSfq",
  },
];

function App() {
  // const schools = await getSchools();
  // console.log(schools);
  return (
    <React.Fragment>
      <NavBar />
      <SummaryCardContainer schools={testDojos} />
    </React.Fragment>
  );
}

export default App;
