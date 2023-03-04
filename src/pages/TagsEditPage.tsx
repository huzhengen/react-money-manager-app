import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsEditPage: React.FC = () => {
  return (<div>
    <Gradient className='grow-0 shrink-0'>
      <TopNav title="View Tag" icon={<Icon name="back" />} />
    </Gradient>
    <TagForm />
  </div>)
}
