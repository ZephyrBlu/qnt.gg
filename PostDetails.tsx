import Head from 'next/head';
import Link from 'next/link';

const PostDetails = ({ preview, path, title, blurb, postedAt, updatedAt }: {
    preview?: boolean,
    path: string,
    title: string,
    blurb: string,
    postedAt: string,
    updatedAt?: string,
}) => (
    <div className={`PostDetails ${preview ? 'PostDetails--preview': ''}`}>
        {!preview &&
            <Head>
                <title>{title} | qnt.gg</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>}
        <Link href={path}>
            <h1 className="PostDetails__title">
                <a>{title}</a>
            </h1>
        </Link>
        {preview && blurb &&
            <p className="PostDetails__blurb">
                {blurb}
            </p>}
        <div className="PostDetails__date-wrapper">
            <div className="PostDetails__date Post__date--posted">
                Posted: {postedAt}
            </div>
            {updatedAt &&
                <div className="PostDetails__date Post__date--updated">
                    (Last Updated: {updatedAt})
                </div>}
            </div>
    </div>
);

export default PostDetails;
