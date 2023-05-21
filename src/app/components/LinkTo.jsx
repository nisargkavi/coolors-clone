import Link from 'next/link'
import generateHex from '@/app/utils/generateHex'

const LinkTo = ({propContent}) => {
    const randomColorString = generateHex();
    return (
        <div>
            <Link href={`/palette/${randomColorString}`}>
                {propContent}
            </Link>
        </div>
    )
}

export default LinkTo;