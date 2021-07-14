import Crypto from "../components/Crypto";

export default function Cryptos({ cryptos }) {
  return (
    <div className="grid">
      {cryptos.map((crypto) => (
        <Crypto crypto={crypto} key={crypto.id} />
      ))}

      <style jsx>{`
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1000px;
          margin-top: 1rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
