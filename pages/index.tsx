import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import * as postDetailObjects from './blog';

const Home = ({ posts }) => {
    const postDetails = Object.entries(postDetailObjects);

    return (
        <div className="Home">
            {postDetails.map(([componentName, postDetails]) => (
                <Link key={posts[componentName]} href={`/${posts[componentName]}`}>
                    <a>
                        {postDetails}
                    </a>
                </Link>
            ))}
        </div>
    );
};

export async function getStaticProps() {
    const postsDir = path.join(process.cwd(), 'pages/blog');
    const componentPostNameMap = await fs.readdir(postsDir).then((postNames) => {
        const componentNameMap = {};
        postNames.forEach((name) => {
            if (name === 'index.js') {
                return;
            }
            // discard file extension
            const noExt = name.split('.')[0];
            const componentName = noExt.split('-').map((part, index) => {
                if (index !== 0) {
                    return part.charAt(0).toUpperCase() + part.slice(1);
                }
                return part;
            }).join('');
            componentNameMap[componentName] = name;
        });
        return componentNameMap;
    });

    return {
        props: {
            posts: componentPostNameMap,
        }
    }
};

export default Home;
