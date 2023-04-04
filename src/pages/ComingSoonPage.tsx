import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const ComingSoonPage: React.FC = () => {
  const nav = useNavigate()
  return (
    <div flex justify-center items-center flex-col gap-y-24px py-48px h-screen px-48px>
      <Icon name="pig" className="w-128px h-128px" />
      <h1>Stay tuned...</h1>
      <h2>We are coming soon...</h2>
      <button j-btn onClick={() => nav(-1)}>Back</button>
    </div>
  )
}
