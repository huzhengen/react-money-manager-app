import { useNavigate, useParams } from 'react-router-dom'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { confirmable } from '../lib/confirmable'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsEditPage: React.FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { destroy } = useAjax({ showLoading: true, handleError: true })
  const onDelete = confirmable('确定要删除吗？', async () => {
    await destroy(`/api/v1/tags/${id}`).catch((error) => {
      window.alert('删除失败')
      throw error
    })
    window.alert('删除成功')
    nav('/items/new')
  })
  return (<div>
    <Gradient className='grow-0 shrink-0'>
      <TopNav title="修改标签" icon={<BackIcon />} />
    </Gradient>
    <TagForm type="edit" />
    <div px-16px p-b-32px>
      <button j-btn bg="#E10505" onClick={onDelete}>删除</button>
    </div>
  </div>)
}
