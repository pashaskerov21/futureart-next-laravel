import { redirect } from 'next/navigation'

const NotFound = () => {
    redirect('/404')
}

export default NotFound
