import Head from 'next/head';
import HalftoneEffect from '../components/HalftoneEffect';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Head>
        <title>Halftone Photo Effect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="px-4 py-2">
          <h1 className="text-xl font-semibold text-gray-900">Halftone Photo Effect</h1>
        </div>
      </header>

      <main className="flex-grow overflow-hidden">
        <HalftoneEffect />
      </main>
    </div>
  );
}