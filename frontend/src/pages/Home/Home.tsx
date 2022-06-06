import { useContext } from "react";
import { DataContext } from "../../store";
import * as SC from "./style";

const Home = () => {
  const { globalIsItGood, toggleGlobalIsItGood } = useContext(DataContext);

  return (
    <SC.Main>
      Home page
      <span>Is It any good? {globalIsItGood ? "yes" : "no"}</span>
      <button onClick={toggleGlobalIsItGood}>Toggle GlobalIsItGood</button>
    </SC.Main>
  );
};

export default Home;
