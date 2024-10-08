import { useEffect } from "react";
import { List } from "./components/List";
import { Layout } from "./components/UI/Layout";
import { useItemsStore } from "./store/itemsStore";
import { Loader } from "./components/UI/Loader";

function App() {
  const { items, fetchItems, fetchingItems } = useItemsStore();

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Layout>
      {fetchingItems && <Loader />}
      {items && <List items={items} />}
    </Layout>
  );
}

export default App;
