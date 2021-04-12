import Head from 'next/head';

interface PostDetails {
    preview?: boolean;
    path: string;
    title: string;
    postedAt: string;
    updatedAt?: string;
};

const PostDetails = ({ preview, path, title, postedAt, updatedAt }: PostDetails) => (
    <div className={`PostDetails ${preview ? 'PostDetails--preview': ''}`}>
        {!preview &&
            <Head>
                <title>{title} | qnt.gg</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>}
        <h1 className="PostDetails__title">
            <a href={path}>{title}</a>
        </h1>
        <div className="PostDetails__date-wrapper">
            <div className="PostDetails__date Post__date--posted">
                Posted: {postedAt}
            </div>
            {updatedAt &&
                <div className="PostDetails__date Post__date--updated">
                    Updated: {updatedAt}
                </div>}
            </div>
    </div>
);

export default PostDetails;
