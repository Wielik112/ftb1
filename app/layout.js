import './globals.css';

export const metadata = {
  title: 'FBT Outlet - Panel administratora',
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
