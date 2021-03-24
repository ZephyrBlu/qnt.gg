import type { AppProps } from 'next/app';
import '../styles/globals.css'
import '../styles/App.css';
import '../styles/PostDetails.css';

const App = ({ Component, pageProps }: AppProps) => (
    <div className="App">
        <header className="App__header">
            <h1 className="App__title">
                Header for posts goes here
            </h1>
            <h3 className="App__sub-title">
                A Quantitative Approach to Gaming
            </h3>
        </header>
        <main className="App__page">
            <Component {...pageProps} />
        </main>
    </div>
);

export default App;
