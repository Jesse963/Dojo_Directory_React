import React from "react";
import "./App.css";
import SummaryCardContainer from "./components/summaryCardContainer/summaryCardContainer";
import NavBar from "./components/navbar/navbar";
import SchoolPageRoot from "./components/SchoolPage/SchoolPageRoot";
import StartPage from "./components/StartPage/StartPage";

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      <StartPage />
      {/* <SchoolPageRoot /> */}
      {/* <SummaryCardContainer schools={testDojos} /> */}
    </React.Fragment>
  );
}

export default App;
