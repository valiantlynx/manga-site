import Link from 'next/link'

function SuccessAlert(props: any) {
    return (
        <center>
            <div className="alert alert-success justify-center w-11/12 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>
                    {props.message}
                </span>
                <Link 
                href="/populate"
                className="link link-Warning "
                >
                    Click here to learn more!
                </Link>

            </div>
        </center>
    )
}

export default SuccessAlert