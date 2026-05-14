import styles from "./licence.module.css";

interface Country {
  name: string;
  image: string;
  url: string;
}

interface LicensedCountriesProps {
  countries: Country[];
}

export default function LicensedCountries({ countries }: LicensedCountriesProps) {
  return (
    <div className={styles.countryWrapper}>
      {countries.map((country) => (
        <div className={styles.licensedCountry} key={country.name}>
          <a
            href={country.url}
            target="_blank"
            rel="noopener noreferrer"
            title={country.name}
            className={styles.linkWrapper}
          >
            <div className={styles.imageWrapper}>
              <img
                src={country.image}
                alt={country.name}
                loading="lazy"
                width={125}
                height={125}
              />
              <div className={styles.overlay}></div>
              <div className={styles.label}>
                <span>{country.name}</span>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
