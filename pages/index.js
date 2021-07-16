import Head from "next/head";
import { useEffect } from "react";
import Cryptos from "../components/Cryptos";
import { checkAlertPrice, getCryptoData } from "../lib/Nomics";
export async function getStaticProps() {
  const cryptos = await getCryptoData();
  return {
    props: {
      cryptos,
    },
  };
}

export default function Home({ cryptos }) {
  useEffect(() => {
    window.setInterval(async function () {
      const alertArray = await checkAlertPrice();
      if (alertArray.length) alert(alertArray.map((item) => item));
    }, 60000);
  });
  return (
    <div className="container">
      <Head>
        <title>Crypto Alerta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Crypto Alerta!</a>
        </h1>
        <p className="description">
          Get started by clicking on each crypto currency, and adding the amount
          you want to be notified
        </p>
        <Cryptos cryptos={cryptos} />
      </main>
      <footer>
        <div>Crypto Alerta</div>
      </footer>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .logo {
          height: 1em;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
