import type { AppProps } from 'next/app';
import Link from 'next/link';
import '../styles/globals.css'
import '../styles/App.css';
import '../styles/PostDetails.css';

const App = ({ Component, pageProps }: AppProps) => (
    <div className="App">
        <header className="App__header">
            <Link href="/">
                <h1 className="App__title">
                    <a>qnt</a>
                </h1>
            </Link>
            <h3 className="App__sub-title">
                Quantitative Analysis of Gaming
            </h3>
        </header>
        <main className="App__page">
            <Component {...pageProps} />
        </main>
    </div>
);

export default App;
