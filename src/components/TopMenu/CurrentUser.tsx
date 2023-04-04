import { Link, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { useAjax } from '../../lib/ajax'
import { confirmable } from '../../lib/confirmable'

interface Props {
  className?: string
}

export const CurrentUser: React.FC<Props> = ({ className }) => {
  const { get } = useAjax({ showLoading: false, handleError: false })
  const { data: me, error } = useSWR('/api/v1/me', async path =>
    (await get<Resource<User>>(path)).data.resource
  )
  const name = me?.name ?? me?.email
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  const signOut = confirmable('Sure you want to Sign out?', () => {
    window.localStorage.removeItem('jwt')
    window.location.reload()
  })
  return (
    <div block className={className} bg="#5C33BE" text-white w="100%" pt-32px pb-44px
      px-16px>
      {error
        ? (
          <Link to={`/sign_in?from=${from}`} >
            <h2 text-24px m-b-1>Not logged in</h2>
            <div text="#CEA1FF">Sign In</div>
          </Link>
          )
        : (
          <div onClick={signOut}>
            <h2 text-24px m-b-1 title={name} overflow-hidden text-ellipsis>{name}</h2>
            <div text="#CEA1FF">Sign out</div>
          </div>
          )
      }
    </div >
  )
}
