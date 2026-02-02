import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/app/scss/style.scss';
import Topbar from '@/app/components/layout/Topbar';
import Footer from '@/app/components/layout/Footer';
import Navbar from '@/app/components/layout/Navbar';

export const metadata = {
  title: 'Bienvenido a Heladería Sharita',
  description: 'Heladería Sharita - Tu helado favorito en un solo lugar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Topbar />
        <Navbar />
        {children}
        <Footer />
    </>
  );
}
