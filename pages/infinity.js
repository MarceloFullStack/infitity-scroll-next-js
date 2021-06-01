import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import qs from "qs";
import styles from '../styles/Home.module.css'
import Image from 'next/image'
// import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    handleFetch({ _limit: 2 });
  }, []);

  function handleFetch(params) {
    const strParams = qs.stringify(params);
    let url = "https://jsonplaceholder.typicode.com/posts";

    if (strParams) {
      url = url + "/?" + strParams;
    }

    fetch(url)
      .then(res => res.json())
      .then(res => {
        setPosts(res);
      })
      .catch(err => console.log(err));
  }

  return (
      <div className={styles.pane, styles.pane}>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => handleFetch({ _limit: posts.length + 10 })}
        hasMore={true || false}
        useWindow={false}
        loader={
          <div key="loading" className={styles.loader}>
            Loading ...
          </div>
        }
      >
       <main className={styles.posts}>
      {posts?.map((res)=>{
        return (
          <div key={res.id} className={styles.textStyle}>
          <h4 className={styles.title}>{res.title}</h4>
          <div className={styles.image}>
          <Image
            // src="http://placekitten.com/200/300"
            src="/assets/1.png"
            alt="Picture of the author"
            width={550}
            height={550}
          />
          </div>
          <small className={styles.description}>{res.body}</small>
          <small className={styles.show} onClick={()=>{alert("Exibir produto")}}><a href="">Ver mais...</a></small>
          <br />
          <div className={styles.comprar}>
          <button>Comprar</button>
          <div>R$ 580,00</div>
          </div>
          </div>
        )
      })}
      <footer className={styles.footer}>
        Vaca pé
      </footer>
      </main>
      </InfiniteScroll>
    </div>
  );
}

export default App;
