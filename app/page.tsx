import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <section>
          <div>
            <Image
              src="/oslam-logo.png"
              width={48}
              height={48}
              alt="oslam_logo"
            />
            <span>OSLAM</span>
          </div>

          <nav>
            <Link href="#services">Services</Link>
            <Link href="#mission">Mission</Link>
            <Link href="#about">About</Link>
          </nav>
        </section>

        <Image
          src="/oslam-panorama-img.jpg"
          width="100"
          height="100"
          alt="oslam_hero"
        />
      </header>

      <main>
        <section id="services">
          <h2>Services</h2>
          <ul>
            <li>Internal Medicine</li>
            <li>Ob Gynecology / Perinatology</li>
            <li>Pediatrics</li>
            <li>General Medicine</li>
            <li>Family Medicine</li>
          </ul>
        </section>

        <section id="mission">
          <h2>Our Mission</h2>
          <p>
            <em>OSLAM</em> is commited to provide compassionate, affordable and
            effective patient-centered medical care that promotes health and
            well-being to the community.
          </p>
        </section>

        <section id="about">
          <h2>About</h2>
          <p>
            <em>Ospital ng Lungsod Agham ng Muñoz</em> is a premier healthcare
            facility located in the <em>Science City of Muñoz, Nueva Ecija</em>.
            We are committed to providing exceptional medical services that
            cater to the unique needs of our community. With a focus on
            delivering patient-centered, quality healthcare, we strive to
            improve the health and well-being of all those we serve.
          </p>
          <p>
            Our team of dedicated professionals is here to ensure that every
            patient receives personalized care in a welcoming and compassionate
            environment. We work tirelessly to offer advanced medical treatments
            while upholding the highest standards of care.
          </p>
        </section>
      </main>

      <footer>
        <section>
          <Image
            src="/oslam-logo.png"
            width={72}
            height={72}
            alt="oslam_logo"
          />
          <nav>
            <Link href="#services">Services</Link>
            <Link href="#mission">Mission</Link>
            <Link href="#about">About</Link>
          </nav>
        </section>

        <p>OSLAM • Copyright © 2024</p>
      </footer>
    </>
  );
}
