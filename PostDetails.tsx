import Link from 'next/link';

const PostDetails = ({ preview, path, title, subtitle, postedAt, updatedAt }: {
    preview?: boolean,
    path: string,
    title: string,
    subtitle: string,
    postedAt: string,
    updatedAt?: string,
}) => (
    <div className={`PostDetails ${preview ? 'PostDetails--preview': ''}`}>
        <Link href={path}>
            <h1 className="PostDetails__title">
                <a>{title}</a>
            </h1>
        </Link>
        {subtitle &&
            <h3 className="PostDetails__blurb">
                {subtitle}
            </h3>}
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
