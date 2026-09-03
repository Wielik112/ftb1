import './globals.css';

export const metadata = {
  title: 'FBT Outlet - Panel administratora',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
