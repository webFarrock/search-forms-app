import React from 'react';

export default CircleSpinning => {
    return (
        <div className="circle--spinning">
            <svg
                style={{enableBackground: 'new 0 0 190 190', WebkitBackgroundClip: 'text'}}
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 190 190"
                xmlSpace="preserve"
            >

                <g id="submit">
                    <g id="Ellipse_1">
                        <path className="st0"
                              d="M1.7,95C1.7,43.5,43.5,1.7,95,1.7V0C42.5,0,0,42.5,0,95c0,52.5,42.5,95,95,95v-1.7C43.5,188.3,1.7,146.5,1.7,95z"
                              style={{fill: '#ffffff'}}
                        />
                        <defs>
                            <linearGradient id="SVGID_1_"
                                            gradientUnits="userSpaceOnUse"
                                            x1="142.499" y1="0"
                                            x2="142.499" y2="190"
                            >

                                <stop offset="5.000000e-02" style={{stopColor:'#ffffff', stopOpacity:'0'}}/>
                                <stop offset="0.95" style={{stopColor:'#ffffff'}}/>

                            </linearGradient>
                        </defs>
                        <path className="st1"
                              d="M95,0C95,0,95,0,95,0l0,1.7c0,0,0,0,0,0c51.5,0,93.3,41.9,93.3,93.3c0,51.5-41.9,93.3-93.3,93.3c0,0,0,0,0,0 v1.7c0,0,0,0,0,0c52.5,0,95-42.5,95-95C190,42.5,147.5,0,95,0z"
                              style={{fill: 'url(#SVGID_1_)'}}
                        />

                        <defs>
                            <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse"
                                            x1="142.499" y1="0" x2="142.499" y2="190"
                            >
                                <stop offset="5.000000e-02" style={{stopСolor:'#007bc4', stopOpacity:'0'}} />
                                <stop offset="0.95" style={{stopColor:'#007bc4'}}/>
                            </linearGradient>
                        </defs>
                    </g>
                </g>
            </svg>
        </div>
    )
}