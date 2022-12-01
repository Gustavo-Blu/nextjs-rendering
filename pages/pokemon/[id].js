import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/DetailsPage.module.css';

export default function detailsPage() {
  const [pokemon, setPokemon] = useState({});
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    const fetchSinglePokemon = async () => {
      const res = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      setPokemon(await res.json());
    };

    if (id) {
      fetchSinglePokemon();
    }

    console.log('i was hit');
  }, [id]);

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
