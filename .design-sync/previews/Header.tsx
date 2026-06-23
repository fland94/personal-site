import { Header } from 'federico-landozzi-portfolio';

export function LightTheme() {
  return <Header />;
}

export function DarkTheme() {
  return (
    <div
      ref={(el) => {
        if (el) el.ownerDocument.documentElement.setAttribute('data-theme', 'dark');
      }}
    >
      <Header />
    </div>
  );
}
