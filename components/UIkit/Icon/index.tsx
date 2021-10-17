import React, {FC} from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    href: string;
    src: string;
    width: number;
    height: number;
    onClick?: any;
}

const Icon: FC<LogoProps> = ({href, ...imageProps}) => {
    return (
        <Link href={href}>
            <div>
                <Image {...imageProps} />
            </div>
        </Link>
    );
};

export default Icon;