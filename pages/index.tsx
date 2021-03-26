import { promises as fs } from 'fs';
import path from 'path';
import { Fragment } from 'react';
import Head from 'next/head';
import { TAGLINE } from '../constants';
import * as postDetailObjects from './blog';

const Home = ({ posts }) => {
    const postDetails = Object.entries(postDetailObjects).filter(([name, _]) => (
        name !== 'default'
    ));

    return (
        <div className="Home">
            <Head>
                <title>{TAGLINE} | qnt.gg</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {postDetails.map(([componentName, postDetails]) => (
                componentName in posts &&
                    <Fragment key={posts[componentName]}>
                        {postDetails(true, `/${posts[componentName]}`)}
                    </Fragment>
            ))}
        </div>
    );
};

export async function getStaticProps() {
    const postsDir = path.join(process.cwd(), 'pages/blog');
    const componentPostNameMap = await fs.readdir(postsDir).then((postNames) => {
        const componentNameMap = {};
        postNames.forEach((name) => {
            // don't care about index file
            if (name === 'index.js' || name.slice(0, 4) === 'WIP-') {
                return;
            }
            // discard file extension
            const noExt = name.split('.')[0];

            // split on hyphen, capitalize to camelcase, then rejoin
            const componentName = noExt.split('-').map((part, index) => {
                // first part of name does not need to be capitalized
                if (index !== 0) {
                    return part.charAt(0).toUpperCase() + part.slice(1);
                }
                return part;
            }).join('');

            // map camelcase component name to hyphenated page name without extension
            componentNameMap[componentName] = noExt;
        });
        return componentNameMap;
    });

    return {
        props: {
            posts: componentPostNameMap,
        }
    }
};

export const config = { unstable_runtimeJS: false };

export default Home;
