import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsNewPage: React.FC = () => {
  return (<div>
    <Gradient className='grow-0 shrink-0'>
      <TopNav title="New Tag" icon={<BackIcon />} />
    </Gradient>
    <TagForm type="create" />
  </div>)
}
