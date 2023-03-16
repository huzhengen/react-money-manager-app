import { useNavigate, useParams } from 'react-router-dom'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsEditPage: React.FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { destroy } = useAjax({ showLoading: true, handleError: true })
  const confirmable = (tip: string, fn: () => void) => () => {
    const result = window.confirm(tip)
    if (result) { fn() }
  }
  const onDelete = confirmable('Sure you want to delete it?', async () => {
    await destroy(`/api/v1/tags/${id}`).catch((error) => {
      window.alert('Failed to delete')
      throw error
    })
    window.alert('Delete successfully')
    nav('/items/new')
  })
  return (<div>
    <Gradient className='grow-0 shrink-0'>
      <TopNav title="View Tag" icon={<BackIcon />} />
    </Gradient>
    <TagForm type="edit" />
    <div px-16px p-b-32px>
      <button j-btn bg="#E10505" onClick={onDelete}>Delete</button>
    </div>
  </div>)
}
