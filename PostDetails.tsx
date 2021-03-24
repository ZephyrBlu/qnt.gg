const PostDetails = ({ title, subtitle, postedAt, updatedAt }: {
    title: string,
    subtitle: string,
    postedAt: string,
    updatedAt?: string,
}) => (
    <div className="Post">
        <div className="Post__details">
            <div className="Post__heading">
                <h1 className="Post__title">
                    {title}
                </h1>
                {subtitle &&
                    <h3 className="Post__subtitle">
                        {subtitle}
                    </h3>}
            </div>
            <div className="Post__date-wrapper">
                <div className="Post__date Post__date--posted">
                    {postedAt}
                </div>
                {updatedAt &&
                    <div className="Post__date Post__date--updated">
                        {updatedAt}
                    </div>}
                </div>
        </div>
    </div>
);

export default PostDetails;
