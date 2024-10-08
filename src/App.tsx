import { useEffect, useState } from "react";
import { List } from "./components/List";
import { Layout } from "./components/UI/Layout";
import { useItemsStore } from "./store/itemsStore";
import { getList } from "./mockData/list";
import { Loader } from "./components/UI/Loader";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { items, fetchItems } = useItemsStore();

  useEffect(() => {
    fetchItems()
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      {items && <List items={items} />}
    </Layout>
  );
}

export default App;
