import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/DetailsPage.module.css';

export default function detailsPage({ pokemon }) {
  console.log(typeof pokemon.type);
  console.log(Array(pokemon.type));

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div className={styles.heading}>
        <Link href="/">Back To Home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={
              pokemon.image
                ? `https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`
                : ''
            }
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type?.join(', ')}</div>
          <table className={styles.stats}>
            <thead>
              <tr>
                <th className={styles.column}>Name</th>
                <th className={styles.column}>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats?.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${context.params.id}.json`
  );

  return {
    props: {
      pokemon: await res.json(),
    },
  };
}
