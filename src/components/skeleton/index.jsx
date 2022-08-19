import React from "react";
import ContentLoader from "react-content-loader";

import './skeleton.scss';

export default function Skeleton() {
    return (
        <div className="cardSkelet">
            <ContentLoader
                speed={2}
                width={150}
                height={200}
                viewBox="0 0 150 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                <rect x="0" y="95" rx="3" ry="3" width="150" height="15" />
                <rect x="0" y="166" rx="3" ry="3" width="80" height="24" />
                <rect x="0" y="115" rx="0" ry="0" width="93" height="15" />
                <rect x="114" y="158" rx="8" ry="8" width="32" height="32" />
            </ContentLoader>
        </div>
    )
}