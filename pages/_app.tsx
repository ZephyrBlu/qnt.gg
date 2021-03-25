import type { AppProps } from 'next/app';
import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';
import LinkToNewTab from '../components/LinkToNewTab';
import { TAGLINE } from '../constants';
import '../styles/globals.css'
import '../styles/App.css';
import '../components/PostDetails.css';

const App = ({ Component, pageProps }: AppProps) => (
    <div className="App">
        <header className="App__header">
            <Link href="/">
                <h1 className="App__title">
                    <a>qnt</a>
                </h1>
            </Link>
            <h3 className="App__sub-title">
                {TAGLINE}
            </h3>
        </header>
        <main className="App__page">
            <MDXProvider components={{ a: LinkToNewTab }} >
                <Component {...pageProps} />
            </MDXProvider>
        </main>
    </div>
);

export default App;
