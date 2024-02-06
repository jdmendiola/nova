import Logo from '../assets/inboxwod_logo.png';

export default function Header() {
  return (
    <>
      <section id="header">
        <div className="container">
          <div className="header-container">
            <a href="/">
              <img id="logo" src={Logo} />
            </a>
            <span>INBOXWOD</span>
          </div>
        </div>
      </section>
    </>
  );
}
